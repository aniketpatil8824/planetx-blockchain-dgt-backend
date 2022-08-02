'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config')

const transactionSchema = new Schema({
  _id: String,
  txHash: String,
  type: {
    type: String,
    enum: ['CREATE_ASSET', 'MINT', 'SELL', 'BUY', 'AUCTION', 'BOTH', 'BID', 'OTHER'],
    default: 'OTHER'
  },
  status: {
    type: String,
    enum: ['NONE', 'FAILED', 'SUCCESS', 'PROCESSING'],
    default: 'NONE'
  }

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

transactionSchema.methods.saveTransactionHash = async function (hash) {
  try {
    this.txHash = hash
    await this.save()
    return this
  } catch (err) {
    throw new Error(err)
  }
}

transactionSchema.methods.setFailed = async function () {
  try {
    this.status = 'FAILED'
    await this.save()
    return this
  } catch (err) {
    throw new Error(err)
  }
}

transactionSchema.methods.setSuccess = async function () {
  try {
    this.status = 'SUCCESS'
    await this.save()
    return this
  } catch (err) {
    throw new Error(err)
  }
}

transactionSchema.methods.setProcessing = async function () {
  try {
    this.status = 'PROCESSING'
    await this.save()
    return this
  } catch (err) {
    throw new Error(err)
  }
}

const Transaction = mongoose.model('transaction', transactionSchema)
module.exports = Transaction
