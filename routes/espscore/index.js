import express from 'express'
import companyRoutes from './company'
import productRoutes from './product'

const router = express.Router()

/* GET users listing. */
router.use('/company', companyRoutes)
router.use('/product', productRoutes)

export default router
