import Web3 from 'web3'
import config from '../config'

const web3 = new Web3(config.NETWORK.ETH.RPC_API)

export default web3
