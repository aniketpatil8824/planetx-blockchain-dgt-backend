import express from 'express'
import userRoute from './user'
import adminRoute from './admin'
import merchantRoute from './merchant'
import healthRoute from './health'
import verifyAPIKey from '../middleware/verifyAPIKey.js'

const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'PlanetX DGT Blockchain Backend Server' })
})

router.use('/user', verifyAPIKey, userRoute)
router.use('/admin', verifyAPIKey, adminRoute)
router.use('/merchant', verifyAPIKey, merchantRoute)
router.use('/health', healthRoute)

export default router
