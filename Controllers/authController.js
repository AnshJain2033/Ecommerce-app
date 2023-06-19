import userModel from  '../models/userModel.js'
import { comparePassword, hashPassword } from '../helpers/authHelper.js'
import JWT from 'jsonwebtoken'
export const registerController = async(req,res)=>{
try {
    
    const {name,email,Address,phoneNumber,password,role}=req.body
    if(!name){
        return res.send('Name is required')
    }
    if(!email){
        return res.send('Email is required')
    }
    if(!Address){
        return res.send('Address is required')
    }
    if(!phoneNumber){
        return res.send('phone Number is required')
    }
    if(!password){
        return res.send('password is required')
    }  
   
    //check for existing user
    const existingUser = await userModel.findOne({email:email})

    if(existingUser){
        return res.status(200).send({
            success:true,
            message:'Already a user Please Login'
        })
    }
    //register the user
    const hashedPassword =await hashPassword(password)
    //save the user
    const user = await new userModel({name,email,Address,phoneNumber,password:hashedPassword,role}).save()
    //send the response
    res.status(200).send({
        success:true,
        message:'User is Registerd successfully',
        user
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'sorry error occured',
        error
    })
}
     
}


//POST LOGIN CONTROLLER
export const loginController =async(req,res)=>{
    try {
        //DESTRUCTURED FROM BODY
        const {email,password}= req.body
        //validation
        if(!email||!password){
            return res.status(404).send({
                success:false,
                message:'Invalid Email or password'
            })
        }
        //check for user
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registred"
            })
        }
        //check match
        const match=await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid password'
            })
        }
        //TOKEN
        const token =await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:"2h"
        })
        res.status(200).send({
            success:true,
            message:"login is succesfull",
            user:{
                name:user.name,
                email:user.email,
                Address:user.Address,
                phoneNumber:user.phoneNumber
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in login",
            error
        })
    }
}