import { z } from "zod";

// Default blockfrost URLs as fallbacks
export const DEFAULT_BLOCKFROST_MAINNET_PROVIDER_URL =
  "https://cardano.blockfrost.io/api/v0";
export const DEFAULT_BLOCKFROST_TESTNET_PROVIDER_URL =
  "https://cardano-preprod.blockfrost.io/api/v0";
export const DEFAULT_SUPPORT_CHAINS = {
  CARDANO: "cardano",
  CARDANO_PREPROD: "cardano-preprod",
};

export const cardanoEnvSchema = z.object({
  CARDANO_SEED_PHRASE: z.string().optional(),
  CARDANO_BLOCKFROST_ID_PREPROD: z.string().optional(),
  CARDANO_BLOCKFROST_ID_MAINNET: z.string().optional(),
});

export type CardanoConfig = z.infer<typeof cardanoEnvSchema>;

/**
 * Get configuration with defaults
 */
export function getConfig(): CardanoConfig {
  return {
    CARDANO_SEED_PHRASE: process.env.CARDANO_SEED_PHRASE,
    CARDANO_BLOCKFROST_ID_PREPROD: process.env.CARDANO_BLOCKFROST_ID_PREPROD,
    CARDANO_BLOCKFROST_ID_MAINNET: process.env.CARDANO_BLOCKFROST_ID_MAINNET,
  };
}
