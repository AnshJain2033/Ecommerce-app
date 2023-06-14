import express from express
import { registerController } from "../Controllers/authController.js"
const router=express.Router()

//Register 
router.post('/register',registerController)


export default router