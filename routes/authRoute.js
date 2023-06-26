import express from 'express'
import { forgotPasswordController, registerController, testController } from "../Controllers/authController.js"
import { loginController } from '../Controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'

const router = express.Router()

//Register 
router.post('/register', registerController)
//LOGIN/post
router.post('/login', loginController)
router.get('/test', requireSignIn, isAdmin, testController)
//forgot password
router.post('/forgot-password', forgotPasswordController)
//protected User  routes
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})
//protected Admin routes
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})
export default router