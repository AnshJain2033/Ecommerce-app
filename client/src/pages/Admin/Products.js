import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/layout/Routes/AdminMenu.js'
import Layout from '../../components/layout/Layout.js'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import Card from 'antd/es/card/Card.js'
import ProductCard from './ProductCard.js'
import { Image, List } from 'antd'
import { Link } from 'react-router-dom'

//Get all products on initialization


const Products = () => {

    const [products, setProducts] = useState([])
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`)
            if (data?.success) {
                setProducts(data?.products)
                setTimeout(() => {
                    toast.success('Products Fetched Successfully')
                }, 1000);
            }
            else {
                setTimeout(() => {
                    toast.error(data?.message)
                }, 1000);
            }


        }
        catch (error) {
            console.log(error)
            toast.error('Error in Fetching the Products')
        }
    }
    useEffect(() => {
        getAllProducts()
    }, [])
    return (
        <div>

            <Layout>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h4>All Products Listed</h4>
                        <div className='col-md-3'>
                            <List>
                                {products?.map((p) =>
                                (
                                    <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                                        <List.Item>
                                            < Card
                                                title={p.name}
                                                cover={< Image src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`
                                                } />}>
                                                {p.description}
                                            </Card>
                                        </List.Item>
                                    </Link>

                                )
                                )}
                            </List>
                        </div>
                    </div>
                </div>
            </Layout >

        </div >
    )
}

export default Products