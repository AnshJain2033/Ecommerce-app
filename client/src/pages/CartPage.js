import React from 'react'
import Layout from '../components/layout/Layout'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { useState, useEffect } from 'react'
import axios from 'axios'
import DropIn from "braintree-web-drop-in-react";
import { Spin } from 'antd';
import { toast } from 'react-hot-toast'
import '../style/CartStyle.css'
const CartPage = () => {
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
    const [clientToken, setClientToken] = useState('')
    const [instance, setInstance] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    //handle payment
    const handlePayment = async () => {
        try {
            setLoading(true)
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
                nonce,
                cart
            })
            setLoading(false)
            localStorage.removeItem('cart')
            setCart([])
            navigate('/dashboard/user/orders')
            setTimeout(() => {
                toast.success("Payment Successful")
            }, 1000);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    //get token
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`)
            setClientToken(data?.clientToken)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getToken()
    }, [auth?.token])
    //total price calculator
    const totalCalculator = () => {
        try {
            let total = 0
            cart?.map(p => {
                total += p.price
            })
            return total.toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR'
            })
        } catch (error) {
            console.log(error)
        }
    }
    //remove from cart
    const removeFromCart = (pid) => {
        try {
            let mycart = [...cart]
            let index = mycart.findIndex(item => item._id === pid)
            mycart.splice(index, 1);
            setCart(mycart)
            localStorage.setItem('cart', JSON.stringify(mycart))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
            <div className='cart-page'>

                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='text-center bg-light mb-1 p'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h5 className='text-center'>
                            {cart?.length > 0 ?
                                `You Have ${cart?.length} items in Your Cart
                            ${auth?.token ? '' : 'Please Login to checkout'}`
                                : `Your Cart is Empty`}
                        </h5>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-8'>
                        {cart?.map(p => (
                            <div className='row mb-2 p-3 card flex-row'>
                                <div className='col-md-4'>
                                    <img
                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                        className='card-img-top'
                                        alt={p.name}

                                    />
                                </div>
                                <div className='col-md-4'>
                                    <p>{p?.name}</p>
                                    <p>{p?.description}</p>
                                    <p>{p?.price}</p>
                                    <div className='col-md-4 cart-remove-btn'>
                                        <button className='btn btn-danger' onClick={() => removeFromCart(p._id)}>Remove</button>
                                    </div>
                                </div>

                            </div>
                        ))}

                    </div>
                    <div className='col-md-4 text-center cart-summary'>
                        <h2>Cart Summary</h2>
                        <hr />
                        <p>Total | Checkout | Payment</p>
                        <h4>Total Amount :: {totalCalculator()} </h4>
                        {auth?.user?.Address ? (
                            <>
                                <div className='mb-3'>
                                    <h4 >Current Address::</h4>
                                    <h5 >{auth?.user?.Address}</h5>
                                    <button className='btn btn-outline-warning'
                                        onClick={() => navigate('/dashboard/user/profile')}
                                    >Update Address</button>
                                </div>

                            </>
                        ) : (
                            <div className='mb-3'>
                                {auth?.token ? (
                                    <button className='btn btn-outline-warning'
                                        onClick={() => navigate('/dashboard/user/profile')}
                                    >Update Address</button>
                                ) : (
                                    <button className='btn btn-outline-warning'
                                        onClick={() => navigate('/login', { state: '/cart' })}
                                    >Please Login To Checkout</button>
                                )}
                            </div>

                        )

                        }
                        {!clientToken || !cart?.length ? "" : (
                            <>
                                <div className='mt-2'>
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                            paypal: {
                                                flow: 'vault',
                                            }
                                        }}
                                        onInstance={instance => { setInstance(instance) }}
                                    />
                                    <button className='btn btn-outline-primary'
                                        disabled={loading || !auth?.user?.Address || !instance}
                                        onClick={handlePayment}>{loading ? <Spin /> : "Make Payment"}</button>
                                </div>
                            </>

                        )}


                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default CartPage