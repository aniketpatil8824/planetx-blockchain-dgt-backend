import express from 'express'
import avatar from './avatar.js'
import citizenship from './citizenship.js'
const router = express.Router()

router.use('/avatar', avatar)
router.use('/citizenship', citizenship)

export default router
