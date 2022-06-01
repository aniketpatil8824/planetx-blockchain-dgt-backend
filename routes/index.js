import express from 'express'
import userRoute from './user'
import adminRoute from './admin'
import merchantRoute from './merchant'

const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'PlanetX DGT Blockchain Backend Server' })
})

router.use('/user', userRoute)
router.use('/admin', adminRoute)
router.use('/merchant', merchantRoute)

export default router
