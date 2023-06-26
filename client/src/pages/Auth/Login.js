import React from 'react'
import Layout from '../../components/layout/Layout'
import { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate,useLocation } from 'react-router-dom'
import '../../style/AuthStyle.css'
import { useAuth } from '../../context/auth';
const  Login=()=> {
    // setTimeout(()=>{},1000)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth,setAuth]=useAuth()
    const navigate =useNavigate()
    const location=useLocation()

     //Handle Submit of Form
     const handleSubmit= async (e)=>{
        e.preventDefault()
        try {
            const res =await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password})
            if(res.data.success){
                setTimeout(()=>{
                    toast.success(res.data.message)
                },1000)
                
                setAuth({
                   ...auth,
                   user:res.data.user,
                   token:res.data.token, 
                })
                localStorage.setItem('auth',JSON.stringify(res.data));
                navigate(location.state||'/')
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
    <Layout>
    <div className="form-container">
 
     <form onSubmit={handleSubmit} >
     <h4 className='title'>LOGIN FORM</h4>
     <div className="mb-3">
     
         <input required type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className="form-control" id="exampleInputEmail" placeholder='Enter Email' />
     </div>

     <div className="mb-3">

         <input required type="password" onChange={(e)=>setPassword(e.target.value)} value={password}  className="form-control" id="exampleInputPassword" placeholder='Enter Password' />
     </div>
   
     <button type="submit" className="btn btn-primary">Login</button>
     <div className="mb-3">
     <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>Forgot Password</button>
     </div>
     </form>

    </div>
 </Layout>
  )
}

export default Login