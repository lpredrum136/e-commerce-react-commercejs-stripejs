import React from 'react'
import './App.css'
import { Cart, Checkout, Layout, Products } from './components'
import CartContextProvider from './contexts/cart'
import ProductContextProvider from './contexts/product'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ShippingContextProvider from './contexts/shipping'

function App() {
  return (
    <ProductContextProvider>
      <CartContextProvider>
        <ShippingContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Products />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ShippingContextProvider>
      </CartContextProvider>
    </ProductContextProvider>
  )
}

export default App
