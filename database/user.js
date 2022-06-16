import validator from 'validator'
import mongoose from 'mongoose'
import config from '../config'

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate (username) {
      if (validator.isEmpty(username)) {
        throw new Error('Username field can not be empty!')
      }
    }
  },
  role: {
    type: Number,
    required: true,
    enum: Object.values(config.DB_CONSTANTS.USER.ROLE)
  },

  status: {
    type: Number,
    required: true,
    enum: Object.values(config.DB_CONSTANTS.USER.STATUS),
    default: config.DB_CONSTANTS.USER.STATUS.ACTIVE
  },

  wallet: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'wallets'
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const User = mongoose.model('users', userSchema)
export default User
