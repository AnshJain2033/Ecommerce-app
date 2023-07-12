import React, { useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/Routes/UserMenu'
import { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../style/AuthStyle.css';
import { useAuth } from '../../context/auth';

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth()
  //states

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [Address, setAddress] = useState("")
  const [answer, setAnswer] = useState("")

  const [password, setPassword] = useState("")
  const navigate = useNavigate()



  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/update-profile`,
        { name, email, phoneNumber, Address, password })

      if (data?.error) {
        toast.error(data?.error)
      } else {
        setAuth({ ...auth, user: data?.updatedUser })
        let ls = localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem("auth", JSON.stringify(ls))
        // localStorage.setItem('auth', JSON.stringify({ ...auth, user: data?.updatedUser }));
        toast.success('Profile is Updated')

      }
    }

    catch (error) {
      console.log(error)
      setTimeout(() => {
        toast.error('Something went wrong')
      }, 1000)

    }
  }

  useEffect(() => {
    setTimeout(() => {
      const { name, email, phoneNumber, Address } = auth?.user
      setEmail(email)
      setName(name)
      setAddress(Address)
      setPhoneNumber(phoneNumber)
      console.log(auth)
    }, 1000);

  }, [auth?.user])



  return (
    <>
      <Layout title={'Dashboard-Profile'}>
        <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
              <UserMenu />
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-3'>
                <div className="form-container">

                  <form onSubmit={handleSubmit}>
                    <h4 className='title'>USER PROFILE</h4>
                    <div className="mb-3">

                      <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" id="exampleInputName" placeholder='Enter Name' />
                    </div>
                    <div className="mb-3">

                      <input type="email" disabled onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" id="exampleInputEmail" placeholder='Enter Email' />
                    </div>

                    <div className="mb-3">

                      <input type="text" onChange={(e) => setAddress(e.target.value)} value={Address} className="form-control" id="exampleInputAddress" placeholder='Enter Address' />
                    </div>
                    <div className="mb-3">

                      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="exampleInputPassword" placeholder='Enter Password' />
                    </div>
                    <div className="mb-3">

                      <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} className="form-control" id="exampleInputPhoneNumber" placeholder='Enter Phone Number' />
                    </div>

                    <button type="submit" className="btn btn-primary">Update</button>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Profile