import { Assets, LucidEvolution } from "@lucid-evolution/lucid";
import {
    type Action,
    type ActionExample,
    type IAgentRuntime,
    type Memory,
    type State,
    composePromptFromState,
    elizaLogger,
    HandlerCallback,
    ModelType,
    parseJSONObjectFromText,
} from "@elizaos/core";
import { transferTemplate } from "../templates";
import { TransferParams, TransferResponse } from "../types";
import { initWalletProvider } from "../providers";

export { transferTemplate };

export class TransferAction {
    constructor(private lucid: LucidEvolution) { }

    async transfer(params: TransferParams): Promise<TransferResponse> {
        elizaLogger.debug("Starting transfer with params:", JSON.stringify(params, null, 2));
        const { chain, toAddress, token, amount, data } = params;
        const resp: TransferResponse = {
            chain: params.chain,
            txHash: "0x",
            recipient: params.toAddress,
            amount: "",
            token: params.token,
        };

        const asset: Assets = { lovelace: BigInt(amount) * 1_000_000n }
        const tx = await this.lucid
            .newTx()
            .pay.ToAddress(toAddress, asset)
            .complete()
        const signedTx = await tx.sign.withWallet().complete();
        const txHash = await signedTx.submit();
        resp.amount = amount;
        resp.txHash = txHash
        await this.lucid.awaitTx(txHash);
        return resp
    }
}

// Transfer 0.001 ADA to addr_test1qprwmyvl6wxchsh0kv88ycdjhz26ayahklzdsn47q734rgsxv77tvavhjleu635ak496qmuf0u7eqhmhlwkcuxh6zlcqh423ej
export const transferAction: Action = {
    name: "TRANSFER",
    similes: ["TRANSFER", "SEND_TOKENS", "TOKEN_TRANSFER", "MOVE_TOKENS"],
    description: "Transfer tokens between addresses on the same chain",
    suppressInitialMessage: true,
    template: transferTemplate,
    validate: async (runtime: IAgentRuntime, message: Memory) => {
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: Record<string, unknown>,
        callback?: HandlerCallback) => {
        elizaLogger.log("Starting transfer action...");

        if (!state) {
            state = (await runtime.composeState(message)) as State;
        }

        const context = composePromptFromState({
            state,
            template: transferTemplate,
        });

        const result = await runtime.useModel(ModelType.TEXT_LARGE, {
            prompt: context,
        });

        const content = parseJSONObjectFromText(result);

        console.log({ content });

        let token: string;
        token = content.token || 'ADA'
        const walletProvider: LucidEvolution = await initWalletProvider(runtime, content.chain);
        const action = new TransferAction(walletProvider);
        const paramOptions: TransferParams = {
            chain: content.chain,
            token: token,
            amount: content.amount,
            toAddress: content.toAddress,
            data: '0x',
        };

        try {
            elizaLogger.debug("Calling transfer with params:", JSON.stringify(paramOptions, null, 2));

            const transferResp = await action.transfer(paramOptions);
            callback?.({
                text: `Successfully transferred ${transferResp.amount} ${transferResp.token} to ${transferResp.recipient}\nTransaction Hash: ${transferResp.txHash}`,
                content: { ...transferResp },
            });

            return true;
        } catch (error) {
            elizaLogger.error("Error during transfer:", error.message);
            // Enhanced error diagnosis
            let errorMessage = error.message;
            callback?.({
                text: `Transfer failed: ${errorMessage}`,
                content: { error: errorMessage },
            });
            return false;
        }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Transfer 0.001 ADA to 0x2CE4EaF47CACFbC6590686f8f7521e0385822334",
                },
            },
            {
                name: "{{agent}}",
                content: {
                    text: "I'll help you transfer 0.001 ADA to 0x2CE4EaF47CACFbC6590686f8f7521e0385822334 on Cardano",
                    action: "TRANSFER",
                    content: {
                        chain: "cardano",
                        token: "ADA",
                        amount: "1",
                        toAddress: "0x2CE4EaF47CACFbC6590686f8f7521e0385822334",
                    },
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Transfer 1 token of 0x1234 to 0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "I'll help you transfer 1 token of 0x1234 to 0x742d35Cc6634C0532925a3b844Bc454e4438f44e on Cardano",
                    action: "TRANSFER",
                    content: {
                        chain: "cardano",
                        token: "0x1234",
                        amount: "1",
                        toAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
                    },
                },
            },
        ],
    ] as ActionExample[][],
} as Action;