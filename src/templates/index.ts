export const getBalanceTemplate = `Given the recent messages and wallet information below:

{{recentMessages}}

{{walletInfo}}

Extract the following information about the requested check balance:
- Chain to execute on. Must be one of ["cardano", "cardano-preprod"]. Default is "cardano-preprod".
- Address to check balance for. Optional, must be a valid Cardano address. If not provided, use the Cardano chain Wallet Address.
- Token symbol or address. Could be a token symbol or address. If the policy token (unit) is provided, it must be a valid Cardano policy. Default is "ADA".
If any field is not provided, use the default value. If no default value is specified, use null.

Respond with a JSON markdown block containing only the extracted values. Use null for any values that cannot be determined:

\`\`\`json
{
    "chain": SUPPORTED_CHAINS,
    "address": string | null,
    "token": string
}
\`\`\`
`;

export const transferTemplate = `Given the recent messages and wallet information below:

{{recentMessages}}

{{walletInfo}}

Extract the following information about the requested transfer:
- Chain to execute on. Must be one of ["cardano", "cardano-preprod"]. Default is "cardano-preprod".
- Token symbol or policy (unit token). Optional. Default is "ADA".
- Amount to transfer. Optional. Must be a string representing the amount in ether (only number without coin symbol, e.g., "0.1").
- Recipient address. Must be a valid Cardano address.
- Data. Optional, data to be included in the transaction.
If any field is not provided, use the default value. If no default value is specified, use null.

Respond with a JSON markdown block containing only the extracted values. Use null for any values that cannot be determined:

\`\`\`json
{
    "chain": SUPPORTED_CHAINS,
    "token": string | null,
    "amount": string | null,
    "toAddress": string,
    "data": string | null
}
\`\`\`
`;