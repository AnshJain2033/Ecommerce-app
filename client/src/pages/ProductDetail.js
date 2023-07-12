import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/Cart'
const ProductDetail = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])
    const [cart, setCart] = useCart()
    const navigate = useNavigate()
    //run at initial time using useEffect
    useEffect(() => {
        if (params?.slug) {
            getProduct()

        }
    }, [params?.slug])
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            getRelatedProduct(data?.product?._id, data?.product?.category?._id)
        }
        catch (error) {
            console.log(error)
            setTimeout(() => {
                toast.error('Error In Getting Product Details')
            }, 1000);

        }
    }
    //  get related product
    const getRelatedProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProduct(data?.product)

        } catch (error) {
            console.log(error)
            toast.error('Error in loading related Products')
        }
    }
    return (
        <>
            <Layout>
                <div className='container'>
                    <div className='row container mt-2'>
                        <div className='col-md-6'>
                            <img
                                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                                className='card-img-top'
                                height={300}
                                width={'350px'}
                                alt={product.name}
                            />
                        </div>
                        <div className='col-md-6'>
                            <h1 className='text-center'>Product Detail</h1>
                            <h6>Name: {product.name}</h6>
                            <h6>Description: {product.description}</h6>
                            <h6>Price: {product.price} $</h6>
                            <h6>Category: {product?.category?.name}</h6>
                            <h6>Name: {product.name}</h6>
                            <button className='btn btn-secondary ms-2' onClick={() => {
                                setCart([...cart, product]);
                                localStorage.setItem(
                                    'cart',
                                    JSON.stringify([...cart, product])
                                )
                                setTimeout(() => {
                                    toast.success('Item Added To Cart')
                                }, 1000);
                            }
                            }
                            >Add To Cart</button>
                        </div>
                    </div>
                    <hr />
                    <div className='row'>
                        <h4>Similar Products</h4>
                        {relatedProduct.length < 1 && <p className='text-center'>No Related Product Found</p>}
                        <div className='d-flex flex-wrap'>
                            {relatedProduct?.map((p) =>
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
            </Layout>
        </>
    )
}

export default ProductDetail