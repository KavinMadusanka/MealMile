import React from 'react'
import Header from './Header'
import Footer from './footer'
import { Helmet } from "react-helmet"
//import { ToastContainer} from "react-toastify";
import { Toaster } from "react-hot-toast"
//import 'react-toastify/dist/ReactToastify.css'

const Layout = ({children, title,description,keywords,author}) => {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name = "description" content = { description } />
        <meta name = "keywords" content = { keywords } />
        <meta name = "author" content = { author } />
        <title>{ title }</title>
      </Helmet>
        <Header/>
        <main style={{minHeight: '48vh'}}>
        <Toaster/>
            {children}
        </main>
        <Footer/>
    </div>
  )
}

Layout.defaultProps = {
  title: "MealMile",
  description: "Mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "SE-S2-WD-02"
}

export default Layout