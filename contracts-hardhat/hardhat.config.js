require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-etherscan')
require('@nomiclabs/hardhat-web3')
require('@nomiclabs/hardhat-waffle')
require('@openzeppelin/hardhat-upgrades')

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
  return privateKeysArray
}

const MNEMONIC = 'tunnel rare laptop hat vague tree eternal vague edge protect differ twelve'
const ETHERSCAN_API_KEY = 'S4IBTIBTMF8U87TC4Q9M11UGQFBKQDSJUG'
const GOERLI_RPC_URL = 'https://goerli.infura.io/v3/fa3d33544cba4913bbb7ae4c14d72e01'

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

    goerli: {
      url: GOERLI_RPC_URL,
      accounts: {
        mnemonic: MNEMONIC
      }
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
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY
  },

  mocha: {
    timeout: 500000
  }
}
