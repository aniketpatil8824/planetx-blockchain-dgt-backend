'use strict'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const payoutSchema = new Schema({
  _id: String,
  toAddress: {
    type: String
  },
  amount: {
    type: String
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

payoutSchema.methods.setFailed = async function () {
  try {
    this.status = 'FAILED'
    await this.save()
    return this
  } catch (err) {
    throw new Error(err)
  }
}

payoutSchema.methods.setSuccess = async function () {
  try {
    this.status = 'SUCCESS'
    await this.save()
    return this
  } catch (err) {
    throw new Error(err)
  }
}

payoutSchema.methods.setProcessing = async function () {
  try {
    this.status = 'PROCESSING'
    await this.save()
    return this
  } catch (err) {
    throw new Error(err)
  }
}

const Payout = mongoose.model('payout', payoutSchema)
export default Payout
