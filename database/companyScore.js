import validator from 'validator'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const companyScoreSchema = new Schema({
  companyId: {
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

const CompanyScores = mongoose.model('companyScores', companyScoreSchema)
export default CompanyScores
