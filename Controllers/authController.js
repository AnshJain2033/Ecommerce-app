import userModel from  '../models/userModel.js'
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
    if(!role){
        return res.send('Role is required')
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
    const hashedPassword =await hashedPassword(password)
    //save the user
    const user = new userModel({name,email,Address,phoneNumber,password:hashedPassword,role}).save()
    //send the response
    res.send({
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
