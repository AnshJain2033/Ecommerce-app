import React from 'react'
import Layout from '../../components/layout/Layout'
import { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios'

import '../../style/AuthStyle.css'
import {useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [answer, setAnswer] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const navigate =useNavigate()
    const handleSubmit= async (e)=>{
        e.preventDefault()
        try {
            const res =await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{email,newPassword,answer})
            if(res.data.success){
                setTimeout(()=>{
                    toast.success(res.data.message)
                },1000)
                
                navigate('/login')
            }else{
                setTimeout(()=>{
                    toast.error(res.data.message)
                },1000)
                
            }
        } catch (error) {
            console.log(error)
            setTimeout(()=>{
                toast.error('Something went wrong')
            },1000)
            
        }
    }
  return (
    
    <>
    <Layout>
        <div className="form-container" title='Forgot Password'>
    
    <form onSubmit={handleSubmit} >
    <h4 className='title'>Password Reset FORM</h4>
    <div className="mb-3">
    
        <input required type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className="form-control" id="exampleInputEmail" placeholder='Enter Email' />
    </div>
    <div className="mb-3">
    
    <input required type="text" onChange={(e)=>setAnswer(e.target.value)} value={answer} className="form-control" id="exampleInputAnswer" placeholder='Enter your school name' />
    </div>
    <div className="mb-3">

        <input required type="password" onChange={(e)=>setNewPassword(e.target.value)} value={newPassword}  className="form-control" id="exampleInputPassword" placeholder='Enter Password' />
    </div>

    <button type="submit" className="btn btn-primary">Reset</button>
    
    </form>
    </div>
    </Layout>
   </>
  )
}

export default ForgotPassword