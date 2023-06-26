import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/Routes/AdminMenu'

const Users = () => {
  return (
    <>
    <Layout title={'Dashboard-All-User'}>
    <div className='container-fluid m-3 p-3'>
    <div className='row'>
        <div className='col-md-3'>
          <AdminMenu/>
        </div>
        <div className='col-md-9'>
            <div className='card w-75 p-3'>
            <h4>All users</h4>  
              </div>
          </div>
        </div>   
        </div> 
    </Layout>
    </>
  )
}

export default Users