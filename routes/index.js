import express from 'express'
import userRoute from './user'
import vestingRoute from './vesting'
import companyRoute from './company'
import adminRoute from './admin'
import merchantRoute from './merchant'
import authRoute from './auth'
import healthRoute from './health'
import verifyAPIKey from '../middleware/verifyAPIKey.js'

const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'PlanetX DGT Blockchain Backend Server' })
})

router.use('/user', verifyAPIKey, userRoute)
router.use('/vesting', verifyAPIKey, vestingRoute)
router.use('/company', verifyAPIKey, companyRoute)
router.use('/admin', verifyAPIKey, adminRoute)
router.use('/auth', authRoute)
router.use('/merchant', verifyAPIKey, merchantRoute)
router.use('/health', healthRoute)

export default router
