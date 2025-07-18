import React from 'react'
import { BrowserRouter, Routes, Route,useParams } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Product from './Pages/Product'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/about' element={<About/>}/>                
                <Route path='/product' element={<Product/>}/>
                <Route path='/contact' element={<Contact/>}/>
                <Route path='/cart' element={<Cart/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router