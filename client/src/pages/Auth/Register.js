import React from 'react';
import Layout from '../../components/layout/Layout';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../style/AuthStyle.css';
const Register = () => {
    // setTimeout(()=>{},1000)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [Address, setAddress] = useState("")
    const [password, setPassword] = useState("")
    const navigate =useNavigate()
    //Handle Submit of Form
    const handleSubmit= async (e)=>{
        e.preventDefault()
        try {
            const res =await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,phoneNumber,Address,password})
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
    <Layout>
       <div className="form-container">
     
        <form onSubmit={handleSubmit}>
        <h4 className='title'>REGISTRATION FORM</h4>
        <div className="mb-3">
          
            <input required type="text"  onChange={(e)=>setName(e.target.value)} value={name} className="form-control" id="exampleInputName" placeholder='Enter Name'/>
        </div>
        <div className="mb-3">
        
            <input required type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className="form-control" id="exampleInputEmail" placeholder='Enter Email' />
        </div>
        <div className="mb-3">
           
            <input required type="text" onChange={(e)=>setAddress(e.target.value)} value={Address} className="form-control" id="exampleInputAddress" placeholder='Enter Address'/>
        </div>
        <div className="mb-3">
          
            <input required type="text" onChange={(e)=>setPhoneNumber(e.target.value)} value={phoneNumber} className="form-control" id="exampleInputPhoneNumber" placeholder='Enter Phone Number'/>
        </div>
        <div className="mb-3">

            <input required type="password" onChange={(e)=>setPassword(e.target.value)} value={password}  className="form-control" id="exampleInputPassword" placeholder='Enter Password' />
        </div>
      
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>

       </div>
    </Layout>
  )
}

export default Register