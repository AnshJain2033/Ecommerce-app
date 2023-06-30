import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/Routes/AdminMenu.js'
import axios from 'axios'
import toast from 'react-hot-toast'
import CategoryForm from '../../components/layout/form/CategoryForm'
import { Modal } from 'antd'
const CreateCategory = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState()
  const [updatedName, setUpdatedName] = useState()
  //handle update
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, { name: updatedName })
      if (data?.success) {
        setTimeout(() => {
          toast.success(`${updatedName} Updated Successfully`)
        }, 1000);
        setSelected(null)
        setUpdatedName('')

        setVisible(false)
        getAllCategories()
      } else {
        setTimeout(() => {
          toast.error(data?.message)
        }, 1000);
      }
    } catch (error) {
      console.log(error)
      setTimeout(() => {
        toast.error('Error in Updating the Category')
      }, 1000);
    }
  }

  //handle delete
  const handleDelete = async (pid) => {

    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`)
      if (data?.success) {
        setTimeout(() => {
          toast.success(`Category Deleted Successfully`)
        }, 1000);


        setVisible(false)
        getAllCategories()
      } else {
        setTimeout(() => {
          toast.error(data?.message)
        }, 1000);
      }
    } catch (error) {
      console.log(error)
      setTimeout(() => {
        toast.error('Error in Deleting the Category')
      }, 1000);
    }
  }
  //handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name })
      if (data?.success) {
        setTimeout(() => {
          toast.success(`${name}  is created`)
        }, 1000);

        getAllCategories()
      } else {
        setTimeout(() => {
          toast.error('data.message')
        }, 1000);

      }
    } catch (error) {
      console.log(error)
      setTimeout(() => {
        toast.error('Something Went wrong in taking input form')
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
      <Layout title={'Dashboard-Create-Category'}>
        <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu />
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-3'>
                <h4>Manage Category</h4>
                <div className='p-3 '>
                  <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                </div>
                <div className='w-75'>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories?.map(c => (
                        <>
                          <tr>
                            <td key={c._id}>{c.name}</td>
                            <td>
                              <button className='btn btn-primary m-2' onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c) }}>Edit</button>
                              <button className='btn btn-danger m-2' onClick={() => { handleDelete(c._id) }}>Delete</button>
                            </td>

                          </tr>
                        </>
                      ))}

                    </tbody>
                  </table>
                </div>
              </div>
              <Modal onCancel={() => { setVisible(false) }} footer={null} visible={visible}>
                <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
              </Modal>
            </div>
          </div>
        </div>

      </Layout>
    </>
  )
}

export default CreateCategory