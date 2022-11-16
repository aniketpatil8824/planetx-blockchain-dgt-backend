import express from 'express'
import { issueAvatarNFT } from '../../controllers/nft/avatar'

const router = express.Router()

// router.get('/', getAccount)
router.post('/', issueAvatarNFT)

export default router
