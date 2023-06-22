import express from 'express'
import { registerController, testController } from "../Controllers/authController.js"
import { loginController } from '../Controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'

const router=express.Router()

//Register 
router.post('/register',registerController)
//LOGIN/post
router.post('/login',loginController)
router.get('/test',requireSignIn,isAdmin,testController)


export default router