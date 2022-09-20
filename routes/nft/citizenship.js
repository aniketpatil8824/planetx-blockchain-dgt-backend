import express from 'express'
import { issueCitizenshipNFT } from '../../controllers/nft/citizenship'

const router = express.Router()

// router.get('/', getAccount)
router.post('/', issueCitizenshipNFT)

export default router
