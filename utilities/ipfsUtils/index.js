import config from '../../config'
import { Web3Stash } from 'web3stash'

export const pinataService = Web3Stash('PINATA', { apiKey: config.PINATA.API_KEY, apiSecret: config.PINATA.API_SECRET })
