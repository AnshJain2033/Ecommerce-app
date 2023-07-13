import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer' >
      <h4 className='text-center'>
        All Rights Are reserved
      </h4>
      <p className='text-center mt-3'>
        <Link to='/about'>About</Link>| <Link to='/Policy'>Privacy Policy</Link>| <Link to='/Contact'>Contact</Link>
      </p>
    </div>
  )
}

export default Footer