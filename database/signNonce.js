import validator from 'validator'
import mongoose from 'mongoose'
import config from '../config'

const Schema = mongoose.Schema

const signNonceSchema = new Schema({
  signer: {
    type: String,
    trim: true,
    required: true

  },
  nonce: {
    type: Number,
    required: true
  }

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const SignNonce = mongoose.model('signNonce', signNonceSchema)
export default SignNonce
