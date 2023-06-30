import React from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/auth'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Checkbox } from 'antd'
function HomePage() {
  const [auth, setAuth] = useAuth()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])


  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);

    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //Get all the Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`)
      if (data) {
        setProducts(data?.products)
        toast.success('Products Fetched Successfully')
      }
      else {
        setTimeout(() => {
          toast.error('Data Not Found')
        }, 1000);
      }
    } catch (error) {
      console.log(error)
      setTimeout(() => {
        toast.error('Error in Getting the Products')
      }, 1000);

    }
  }
  useEffect(() => {
    getAllProducts()
  }, [])
  return (

    <Layout title={'All Products - Best Offers'}>
      <div className='row mt-3'>
        <div className='col-md-3'>
          <h4 className='text-center'>Filter Products</h4>
          <div className='d-flex flex-column m-4'>
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => { console.log(e) }}>{c.name}</Checkbox>
            ))}
          </div>
        </div>
        <div className='col-md-9'>
          <h1 className='text-center'>All Products</h1>
          <div className='d-flex flex-wrap'>

            {products?.map((p) =>
            (
              <div className='card m-2' style={{ width: '18rem' }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className='card-img-top'
                  alt={p.name}
                />
                <div className='card-body'>
                  <h5 className='card-title'>{p.name}</h5>
                  <p className='card-description'>{p.description}</p>
                  <button className='btn btn-primary ms-2'>More Details</button>
                  <button className='btn btn-secondary ms-2'>Add To Cart</button>
                </div>

              </div>
            )
            )}


          </div>
        </div>

      </div>

    </Layout>

  )
}

export default HomePage