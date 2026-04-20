import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../Shared/Footer/Footer'

const RootLayout = () => {
  return (
    <div>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default RootLayout