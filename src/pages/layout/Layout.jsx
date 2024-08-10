import React from 'react'
import Header from './Header'
import { Footer } from './Footer'

const Layout = ({children}) => {
  return (
    <>
<Header />
    <h2>Layout</h2>
    <div>{children}</div>
<Footer />
    </>
  )
}

export default Layout