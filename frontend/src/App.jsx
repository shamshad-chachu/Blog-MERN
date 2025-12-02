import React, { useContext } from 'react'
import {StoreContext} from './Context/StoreContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import UserBlogs from './user/page/UserBlogs'
import Edit_Delete from './user/page/Edit_Delete'
const App = () => {
  return (
    <div className='h-screen' >
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}>Home</Route>
        <Route path='/Blogs' element={<Blogs/>}>Home</Route>
        <Route path='/user/Blogs' element={<UserBlogs/>}>Home</Route>
        <Route path='/user/Blogs/Update' element={<Edit_Delete/>}>Home</Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App