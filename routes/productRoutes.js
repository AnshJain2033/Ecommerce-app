import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { createProductController, getProductsController, getSingleProductController, productDeleteController, productPhotoController, updateProductController } from '../Controllers/productController.js'
import formidable from 'express-formidable'
const router = express.Router()

//Use of Routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)
//get all products ||GET
router.get('/get-product', getProductsController)
//get single product||GET
router.get('/get-product/:slug', getSingleProductController)
//get photo of Single product
router.get('/product-photo/:pid', productPhotoController);
//delete single product[Earlier admin and sign in was not present]
router.delete('/delete-product/:pid', requireSignIn, isAdmin, productDeleteController)
//update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)
export default router