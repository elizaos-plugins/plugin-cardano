import { type Plugin, logger } from "@elizaos/core";
import chalk from 'chalk';
import ora from 'ora';
import Table from 'cli-table3';
import { getConfig } from "./environment";
import { getBalanceAction, transferAction } from "./actions";

const CARDANO_PLUGIN_NAME = "cardano";

// Start the loader
const spinner = ora({
    text: chalk.cyan('Initializing CARDANO Plugin...'),
    spinner: 'dots12',
    color: 'cyan'
}).start();

const actions = [
    getBalanceAction,
    transferAction
];

// Initial banner with chalk styling
console.log(`\n${chalk.cyan('┌────────────────────────────────────────┐')}`);
console.log(chalk.cyan('│') + chalk.yellow.bold('            CARDANO PLUGIN             ') + chalk.cyan(' │'));
console.log(chalk.cyan('├────────────────────────────────────────┤'));
console.log(chalk.cyan('│') + chalk.white('  Initializing CARDANO Services...      ') + chalk.cyan('│'));
console.log(chalk.cyan('│') + chalk.white('  Version: 1.0.0                        ') + chalk.cyan('│'));
console.log(chalk.cyan('└────────────────────────────────────────┘'));

// Display configuration status
const config = getConfig();
const cardanoSeedPhrase = config.CARDANO_SEED_PHRASE ? chalk.green('✓') : chalk.red('✗');
const cardanoBlockfrostIdMainnet = config.CARDANO_BLOCKFROST_ID_MAINNET ? chalk.green('✓') : chalk.red('✗');
const cardanoBlockfrostIdPreprod = config.CARDANO_BLOCKFROST_ID_PREPROD ? chalk.green('✓') : chalk.red('✗');

console.log(`\n${chalk.cyan('┌────────────────────────────────────────┐')}`);
console.log(chalk.cyan('│') + chalk.white(' Configuration Status                   ') + chalk.cyan('│'));
console.log(chalk.cyan('├────────────────────────────────────────┤'));
console.log(chalk.cyan('│') + chalk.white(` CARDANO Seed Phrase               : ${cardanoSeedPhrase}  `) + chalk.cyan('│'));
console.log(chalk.cyan('│') + chalk.white(` CARDANO Blockfrost ID Mainnet     : ${cardanoBlockfrostIdMainnet}  `) + chalk.cyan('│'));
console.log(chalk.cyan('│') + chalk.white(` CARDANO Blockfrost ID Preprod     : ${cardanoBlockfrostIdPreprod}  `) + chalk.cyan('│'));
console.log(chalk.cyan('└────────────────────────────────────────┘'));

// Stop the loader
spinner.succeed(chalk.green('CARDANO Plugin initialized successfully!'));

// Create a beautiful table for actions
const actionTable = new Table({
    head: [
        chalk.cyan('Action'),
        chalk.cyan('H'),
        chalk.cyan('V'),
        chalk.cyan('E'),
        chalk.cyan('Similes')
    ],
    style: {
        head: [],
        border: ['cyan']
    }
});

// Format and add action information
for (const action of actions) {
    actionTable.push([
        chalk.white(action.name),
        typeof action.handler === 'function' ? chalk.green('✓') : chalk.red('✗'),
        typeof action.validate === 'function' ? chalk.green('✓') : chalk.red('✗'),
        action.examples?.length > 0 ? chalk.green('✓') : chalk.red('✗'),
        chalk.gray(action.similes?.join(', ') || 'none')
    ]);
}

// Display the action table
console.log(`\n${actionTable.toString()}`);

// Plugin status with a nice table
const statusTable = new Table({
    style: {
        border: ['cyan']
    }
});

statusTable.push(
    [chalk.cyan('Plugin Status')],
    [chalk.white('Name    : ') + chalk.yellow('plugin-cardano')],
    [chalk.white('Actions : ') + chalk.green(actions.length.toString())],
    [chalk.white('Status  : ') + chalk.green('Loaded & Ready')]
);

console.log(`\n${statusTable.toString()}\n`);

const cardanoPlugin: Plugin = {
  name: CARDANO_PLUGIN_NAME,
  description: "Cardano integration plugin supporting transfers, swaps, staking, bridging, and token deployments",
  services: [],
  actions: actions,
  tests: [],
};

export default cardanoPlugin;
