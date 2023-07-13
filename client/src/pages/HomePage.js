import React from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/auth'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/layout/Routes/Prices'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Space, Spin } from 'antd';
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/Cart'
import '../style/Homepage.css'
function HomePage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [cart, setCart] = useCart()

  //fetch More data
  const fetchMoreData = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-list`, { page })
      setTimeout(() => {
        setPage(page + 1)
        if (data) {
          let addMore = data?.products
          setProducts(products.concat(addMore))
        } else {
          toast.error('Error in adding...')
        }
      }, 1500);

    } catch (error) {
      console.log(error)
      toast.error('Error In fetching More data')
    }
  }
  //get Total Count
  const getTotalCount = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`)
      setTotal(data?.total)
    } catch (error) {
      console.log(error)

    }
  }
  //filter request
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, { checked, radio })
      setProducts(data?.products)
    } catch (error) {
      console.log(error)

    }
  }
  //Handle the filter
  const handleFilter = (value, id) => {
    let all = [...checked]

    if (value) {
      all.push(id)
    }
    else {
      all = all.filter((c) => c !== id)
    }
    setChecked(all)
  }
  // useEffect(() => {
  //   if (!checked.length && !radio.length) { getAllProducts() }
  // }, [checked.length, radio.length])
  useEffect(() => {
    if (checked.length || radio.length) { filterProduct() }
  }, [checked, radio])
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
    getTotalCount()
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
    // getAllProducts()
    fetchMoreData()
  }, [])
  return (

    <Layout title={'All Products - Best Offers'}>
      <img
        src="/images/AnimatedBanner.gif"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      <div className='container home-page'>
        <div className='row mt-3'>
          <div className='col-md-2 filters'>
            <h5 className='text-center'>Filter By Category</h5>
            <div className='d-flex flex-column m-4'>
              {categories?.map((c) => (
                <Checkbox key={c._id} onChange={(e) => { handleFilter(e.target.checked, c._id) }}>{c.name}</Checkbox>
              ))}
            </div>

            <h4 className='text-center mt-4'>Filter By Price</h4>
            <div className='d-flex flex-column m-4'>
              <Radio.Group onChange={(e) => { setRadio(e.target.value) }}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className='d-flex flex-column m-4'>
              <button className='btn btn-danger' onClick={() => window.location.reload()}>Reset Filters</button>
            </div>

          </div>
          <div className='col-md-10'>


            <div className='d-flex flex-wrap'>
              <InfiniteScroll
                dataLength={products.length}
                next={fetchMoreData}
                hasMore={products.length != total}
              // loader={<Space size={"middle"}><Spin size={'large'} /></Space>}
              >
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
              </InfiniteScroll>
            </div>
          </div>
        </div >
      </div>
    </Layout >

  )
}

export default HomePage