import express from 'express'
import { registerController } from "../Controllers/authController.js"
import { loginController } from '../Controllers/authController.js'
const router=express.Router()

//Register 
router.post('/register',registerController)
//LOGIN/post
router.post('/login',loginController)

export default router