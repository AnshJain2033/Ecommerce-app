import React from 'react'
import Layout from '../components/layout/Layout'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../context/Cart'
import toast from 'react-hot-toast'
import '../style/CategoryProductStyle.css'
const CategoryProduct = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const [cart, setCart] = useCart()
    const getProductCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (params?.slug) {
            getProductCategory()
        }
    }, [params?.slug])
    return (
        <Layout>
            <div className='container mt-3 category'>

                <h4 className='text-center'>Category :: {category?.name}</h4>
                <div className="row">
                    <div className="col-md-13 ">
                        <div className='d-flex flex-wrap'>

                            {products?.map((p) =>
                            (
                                <div className='card m-2' key={p._id} style={{ width: '18rem' }}>
                                    <img
                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                        className='card-img-top'
                                        alt={p.name}
                                    />
                                    <div className='card-body'>
                                        <h5 className='card-title'>{p.name}</h5>
                                        <p className='card-description'>{p.description.substring(0, 60)}</p>
                                        <p className='card-price'>Price :: {p.price}$</p>
                                        <button className='btn btn-primary ms-2' onClick={() => { navigate(`/product/${p.slug}`) }}>More Details</button>
                                        <button className='btn btn-secondary ms-2' onClick={() => {
                                            setCart([...cart, p]);
                                            localStorage.setItem(
                                                'cart',
                                                JSON.stringify([...cart, p])
                                            )
                                            setTimeout(() => {
                                                toast.success('Item Added To Cart')
                                            }, 1000);
                                        }
                                        }>Add To Cart</button>
                                    </div>

                                </div>
                            )
                            )}



                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default CategoryProduct