# 🔗 `@elizaos/plugin-cardano`

<div align="center">

[![Cardano](https://img.shields.io/badge/Cardano-0033AD?style=for-the-badge&logo=cardano&logoColor=white)](https://cardano.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**A powerful Cardano blockchain integration plugin for ElizaOS**

*Seamlessly interact with Cardano Mainnet and Preprod networks*

</div>

---

## ✨ Features

- 🌐 **Multi-Network Support** - Cardano Mainnet & Preprod
- 💰 **Balance Queries** - Check ADA and token balances
- 💸 **Token Transfers** - Send ADA and native tokens
- 🔐 **Secure Wallet Management** - Seed phrase based authentication
- 🧪 **Test Coverage** - Comprehensive test suite included

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and pnpm
- A Cardano wallet seed phrase
- Blockfrost API keys for network access

### Installation

```bash
pnpm install @elizaos/plugin-cardano
```

---

## ⚙️ Configuration

> ⚠️ **Security Warning**: Your seed phrase provides full access to your funds. Never share it or commit it to version control!

Create a `.env` file in your project root:

```env
# Cardano Wallet Configuration
CARDANO_SEED_PHRASE=your-seed-phrase-here

# Blockfrost API Keys
CARDANO_BLOCKFROST_ID_PREPROD=your-blockfrost-id-preprod-here
CARDANO_BLOCKFROST_ID_MAINNET=your-blockfrost-id-mainnet-here
```

### 🔑 Getting API Keys

1. Visit [Blockfrost.io](https://blockfrost.io/)
2. Create an account and generate API keys
3. Add the keys to your `.env` file

---

## 🛠️ Core Components

### 📡 Wallet Provider

The Wallet Provider serves as the main interface:

- **Context Management** - Tracks connected address and balance
- **Client Creation** - Initializes Public and Wallet clients
- **Network Switching** - Seamless network transitions

### 🎯 Available Actions

#### 💳 Balance Queries

Get token balances for any Cardano address:

```typescript
// Example usage
Get the ADA balance of addr1... on Cardano Mainnet
Get the USDC balance of addr1... on Cardano Preprod
```

**Parameters:**
- `chain` - Target network (Mainnet/Preprod)
- `address` - Cardano address to query
- `token` - Token symbol (ADA, USDC, etc.)

#### 💸 Token Transfers

Send tokens between Cardano addresses:

```typescript
// Example usage
Transfer 10 ADA to addr1... on Cardano Mainnet
Transfer 5 USDC to addr1... on Cardano Preprod
```

**Parameters:**
- `chain` - Target network
- `token` - Token to transfer
- `amount` - Transfer amount
- `recipient` - Destination address
- `data` - Optional metadata

---

## 🧪 Development & Testing

### Running Tests

Navigate to the plugin directory and execute:

```bash
# Install dependencies
pnpm install

# Run test suite
pnpm test

# Run tests with coverage
pnpm test:coverage
```

### Contributing

We welcome contributions! Please:

1. 🍴 Fork the repository
2. 🌟 Create a feature branch
3. ✅ Ensure tests pass
4. 📝 Submit a pull request

---

## 📋 Requirements

| Component | Version |
|-----------|---------|
| Node.js | 16.0+ |
| pnpm | 7.0+ |
| Cardano Node | Latest |

---

## 🔗 Useful Links

- [Cardano Documentation](https://docs.cardano.org/)
- [Blockfrost API](https://docs.blockfrost.io/)
- [Cardano Developer Portal](https://developers.cardano.org/)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 🏢 Developed by Relipasoft

*Building the future of blockchain integration*

[![Website](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAA/ElEQVR4AWJwL/ChKx6BFjL4nbEFlFvGNgyEMBSd4DZgA2bIBoxByxo3ACMwBr13YApWuLggEvoSiW2Sa1K8BgxPsmwDk5UkxluFkbmMdOZxixA47xDSSK0b97hfCDuTprOeKa/9XSGKIhRaYzAufEN4TrEHQ5JYi7AzXpmJYhUSxNSVBMgWYYH9piiqJBTaZcChEVZYJ6WsSNsiMR3WskYG50VCBz2mkdHW86QQlaltDEJI5dToK2HceoDxcpiXK2mwC6FQYC+8kXqr8EIhFpe4/0AoGm+LuLLZFouJAkLhQGgiIRbLSigceVX6ayOmTtAH4THiEGLCf32EnwDSXhneb6sDAAAAAElFTkSuQmCC)](https://relipasoft.com)

</div>