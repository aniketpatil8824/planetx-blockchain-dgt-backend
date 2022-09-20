import validator from 'validator'
import mongoose from 'mongoose'
import config from '../config'

const Schema = mongoose.Schema

const citizenSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  citizenshipNftId: {
    type: String,
    required: true
  },
  txId: {
    type: String
  }

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const Citizen = mongoose.model('citizenship', citizenSchema)
export default Citizen
