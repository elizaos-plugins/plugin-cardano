export type SupportedChain = "cardano" | "cardano-preprod";

export interface GetBalanceParams {
    chain: SupportedChain;
    address: string;
    token: string;
}

export interface GetBalanceResponse {
    chain: SupportedChain;
    address: string;
    balance?: { amount: string, token: string };
}

export interface TransferParams {
    chain: SupportedChain;
    token?: string;
    amount?: string;
    toAddress: string;
    data?: `0x${string}`;
}

export interface TransferResponse {
    chain: SupportedChain;
    txHash: string;
    recipient: string;
    amount: string;
    token: string;
    data?: `0x${string}`;
}

