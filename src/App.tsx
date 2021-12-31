import React from 'react'
import './App.css'
import { Navbar, Products } from './components'
import Cart from './components/cart/Cart'
import CartContextProvider from './contexts/cart'
import ProductContextProvider from './contexts/product'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'

function App() {
  return (
    <ProductContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Products />} />
              <Route path="cart" element={<Cart />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </ProductContextProvider>
  )
}

export default App
