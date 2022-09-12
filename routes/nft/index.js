import express from 'express'
import avatar from './avatar.js'

const router = express.Router()

router.use('/avatar', avatar)

export default router
