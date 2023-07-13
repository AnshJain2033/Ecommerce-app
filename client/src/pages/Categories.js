import React from 'react'
import useCategories from '../hooks/useCategories.js'
import Layout from '../components/layout/Layout.js'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
const Categories = () => {
    const categories = useCategories()

    return (
        <Layout title={"All Categories"}>
            <div className='container' style={{ marginTop: "10px" }}>
                <div className='row container'>

                    {categories?.map(c => (
                        <div className='col-md-4 mt-5 mb-3 gx-3 gy-3' key={c._id}>
                            <Link to={`/category/${c.slug}`} className='btn cat-btn'>
                                {c.name}
                            </Link>
                        </div>
                    ))}

                </div>
            </div>
        </Layout>
    )
}

export default Categories