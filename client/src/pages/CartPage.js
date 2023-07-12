import React from 'react'
import Layout from '../components/layout/Layout'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
const CartPage = () => {
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()

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
            <div className='container'>
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
                                <div className='col-md-8'>
                                    <p>{p?.name}</p>
                                    <p>{p?.description}</p>
                                    <p>{p?.price}</p>
                                    <Button className='btn btn-danger' onClick={() => removeFromCart(p._id)}>Remove</Button>
                                </div>

                            </div>
                        ))}

                    </div>
                    <div className='col-md-4 text-center'>
                        <h2>Cart Summary</h2>
                        <hr />
                        <p>Total | Checkout | Payment</p>
                        <h4>Total Amount :: {totalCalculator()} </h4>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage