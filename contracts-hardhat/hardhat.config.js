require('dotenv').config()

require('@nomiclabs/hardhat-etherscan')
require('@nomiclabs/hardhat-web3')
require('@nomiclabs/hardhat-waffle')

require('hardhat-gas-reporter')
require('solidity-coverage')
require('hardhat-contract-sizer')

require('./tasks')
const config = require('./config')

function getPrivateKeys () {
  const privateKeys = config.PRIVATE_KEYS
  // if(Object.keys(privateKeys).length === 0){
  //   throw new Error("Please provide private keys in privateKeys.json file for setup")
  // }
  const privateKeysArray = []

  for (const [, value] of Object.entries(privateKeys)) {
    privateKeysArray.push(value)
  }
  const PRIVATE_KEY = '0x8287b2fabaa91f21186384c0385317e4693b6971ffcc3651b5581f9612f555ab'

  return [PRIVATE_KEY]
}

module.exports = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {

    ethereum: {
      url: config.NETWORKS.ETHEREUM.RPC_URL || '',
      accounts: getPrivateKeys()
    },

    rinkeyby: {
      url: config.NETWORKS.RINKEBY.RPC_URL || '',
      accounts: getPrivateKeys()
    },

    ropsten: {
      url: config.NETWORKS.ROPSTEN.RPC_URL || '',
      accounts: getPrivateKeys()
    },

    gorli: {
      url: config.NETWORKS.GORLI.RPC_URL || '',
      accounts: getPrivateKeys()
    },

    kovan: {
      url: config.NETWORKS.KOVAN.RPC_URL || '',
      accounts: getPrivateKeys()
    },

    binance_mainnet: {
      url: config.NETWORKS.BINANCE_CHAIN.RPC_URL || '',
      accounts: getPrivateKeys()
    },

    binance_testnet: {
      url: config.NETWORKS.BINANCE_CHAIN_TESTNET.RPC_URL || '',
      accounts: getPrivateKeys()
    },

    polygon_mainnet: {
      url: config.NETWORKS.POLYGON_MAINNET.RPC_URL || '',
      accounts: getPrivateKeys()
    },

    polygon_testnet: {
      url: config.NETWORKS.POLYGON_TESTNET.RPC_URL || '',
      accounts: getPrivateKeys()
    },

    custom: {
      url: config.NETWORKS.CUSTOM.RPC_URL || '',
      accounts: getPrivateKeys()
    }
  },
  gasReporter: {
    enabled: config.REPORT_GAS,
    currency: 'USD'
  },

  etherscan: {
    apiKey: config.ETHERSCAN_API_KEY
  },

  mocha: {
    timeout: 500000
  }
}
