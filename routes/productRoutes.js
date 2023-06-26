import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { createProductController, getProductsController, getSingleProductController } from '../Controllers/productController.js'
import formidable from 'express-formidable'
const router = express.Router()

//Use of Routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)
//get all products ||GET
router.get('/get-product', getProductsController)
//get single product||GET
router.get('/get-product/:slug', getSingleProductController)
export default router