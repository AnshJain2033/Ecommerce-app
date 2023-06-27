import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/Routes/AdminMenu.js'
import axios from 'axios'
import toast from 'react-hot-toast'
import CategoryForm from '../../components/layout/form/CategoryForm'
const CreateCategory = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
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
      if (data.success) {
        setCategories(data.category)
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
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories?.map(c => (
                        <>
                          <tr>
                            <td key={c._id}>{c.name}</td>
                            <td>
                              <button className='btn btn-primary'>Edit</button>
                            </td>

                          </tr>
                        </>
                      ))}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

      </Layout>
    </>
  )
}

export default CreateCategory