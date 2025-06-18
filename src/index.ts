import { type Plugin, logger } from "@elizaos/core";

const CARDANO_PLUGIN_NAME = "cardano";

logger.info(`Cardano plugin loaded with service name: ${CARDANO_PLUGIN_NAME}`);

const cardanoPlugin: Plugin = {
  name: CARDANO_PLUGIN_NAME,
  description: "Cardano blockchain plugin",
  services: [],
  actions: [],
  tests: [],
};

export default cardanoPlugin;
