import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/Routes/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Select } from 'antd'

import { useNavigate } from 'react-router-dom'
const { Option } = Select
const CreateProduct = () => {
  const [categories, setCategories] = useState([])
  const [photo, setPhoto] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [shipping, setShipping] = useState('')

  const navigate = useNavigate()
  //Create Product
  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append('name', name)
      productData.append('description', description)
      productData.append('category', category)
      productData.append('photo', photo)
      productData.append('price', price)
      productData.append('quantity', quantity)
      productData.append('shipping', shipping)
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData)
      if (data?.success) {
        setTimeout(() => {
          toast.success('Product Created Successfully')
        }, 1000);
        navigate('dashboard/admin/products')

      } else {
        setTimeout(() => {
          toast.error(data?.message)
        }, 1000);
      }

    } catch (error) {
      console.log(error)
      setTimeout(() => {
        toast.error('Error in creating the Product')
      }, 1000);
    }
  }
  //Get all categories from the server
  const getAllCategories = async (req, res) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      if (data?.success) {
        setCategories(data?.category)
      }
    } catch (error) {

      console.log(error)
      setTimeout(() => {
        toast.error('Something went Wrong in Fetching the categories')
      }, 1000)
    }
  }
  useEffect(() => {
    getAllCategories()
  }, [])

  return (
    <>
      <Layout title={'Dashboard-Create-Product'}>
        <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu />
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-3'>
                <h4>Create Product</h4>
                <div className='m-1 w-75'>
                  <Select bordered={false}
                    placeholder='Select From following Categories'
                    size='large' showSearch={true} className='form-select mb-3' onChange={(value) => { setCategory(value) }}>
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>{c.name}</Option>))}
                  </Select>
                  <div className='mb-3'>
                    <label className='btn btn-outline-secondary col-md-12'>
                      {photo ? photo.name : 'Upload Image'}
                      <input type='file' name='photo' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                    </label>
                  </div>
                  <div className='mb-3'>
                    {photo && (
                      <div className='text-center'>
                        <img src={URL.createObjectURL(photo)}
                          alt='Product Image' height='200 px'
                          className='img img-responsive' />
                      </div>
                    )}
                  </div>
                  <div className='mb-3'>
                    <input type='text' value={name}
                      onChange={(e) => setName(e.target.value)}
                      className='form-control'
                      placeholder='Enter the Name' />
                  </div>

                  <textarea value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='form-control'
                    placeholder='Enter the Description' />

                  <div className='mb-3'>
                    <input type='Number' value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className='form-control'
                      placeholder='Enter the Quantity' />
                  </div>
                  <div className='mb-3'>
                    <input type='Number' value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className='form-control'
                      placeholder='Enter the Price' />
                  </div>
                  <div className='mb-3'>
                    <Select bordered={false}
                      placeholder='Select Whether available for shipping or not'
                      size='large' className='form-select mb-3' onChange={(value) => { setShipping(value) }}>
                      <Option value={true}>Yes</Option>
                      <Option value={false}>No</Option>
                    </Select>
                  </div>
                  <div className='mb-3'>
                    <button className='btn btn-primary' onClick={handleCreate}>Create Product</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CreateProduct