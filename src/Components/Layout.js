import React from 'react'
import { Outlet } from 'react-router-dom'
import "../stylesheets/Layout.css"

const Layout = () => {
  return (
    <>
    <div className="bg-img">
        <div className="container">
        <h1 className='title'>TODO</h1>
          <Outlet />
         
        </div>
      </div>
    </>
  )
}

export default Layout
