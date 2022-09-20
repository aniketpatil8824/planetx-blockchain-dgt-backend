'use strict'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const transactionSchema = new Schema({
  _id: String,
  txHash: String,
  type: {
    type: String,
    enum: ['UPDATE_DGT', 'CREATE_SCHEDULE', 'REVOKE_SCHEDULE', 'WITHDRAW_FUNDS', 'RELEASE_FUNDS', 'UPDATE_COMPANY_ESP',
      'ISSUE_AVATAR_NFT', 'ISSUE_CITIZEN_NFT', 'UPDATE_PRODUCT_ESP', 'OTHER'],
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
export default Transaction
