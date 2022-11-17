/* eslint-disable no-undef */
'use strict'

import dotenv from 'dotenv'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import dbConstants from './dbConstants.json'
import contract from './contract.json' 
import privateKeys from './privateKeys.json' 
import queueList from './queue.json' 


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

export default {

  HTTP_STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503
  },

  NETWORK: {
    ETH: {
      RPC_API: process.env.RPC_API
    }
  },

  DATABASE: {
    MONGO: {
      URI: process.env.MONGO_URI
    }
  },

  LOGGER: {
    LEVEL: process.env.LOG_LEVEL || 'debug'
  },

  API_KEY: process.env.API_KEY,

  QUEUE: {
    CONNECTION_URL: process.env.RMQ_CONN_URL,
    LIST: queueList
  },

  DB_CONSTANTS: dbConstants,

  CONTRACT: contract,

  PRIVATE_KEYS: privateKeys,

  KEY_SECURE_PASSWORD: process.env.KEY_SECURE_PASSWORD || 'planetx12345',

  PINATA: {
    API_KEY: process.env.PINATA_API_KEY,
    API_SECRET: process.env.PINATA_API_SECRET
  } 

}
