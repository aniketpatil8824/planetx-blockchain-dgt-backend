import validator from 'validator'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userPointsSchema = new Schema({
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
  userId: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate (userId) {
      if (validator.isEmpty(userId)) {
        throw new Error('userId field can not be empty!')
      }
    }
  },
  points: [Number]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const UserPoints = mongoose.model('userPoints', userPointsSchema)
export default UserPoints
