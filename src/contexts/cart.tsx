import { Cart } from '@chec/commerce.js/types/cart'
import { createContext, ReactNode, useState } from 'react'
import commerce from '../lib/commerce'

interface CartContextDefault {
  loading: boolean
  cart?: Cart
  getCart: () => Promise<void>
  addToCart: (productId: string, quantity?: number) => Promise<void>
}

export const CartContext = createContext<CartContextDefault>({
  loading: true,
  getCart: () => Promise.resolve(),
  addToCart: () => Promise.resolve()
})

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true)

  const [cart, setCart] = useState<Cart>()

  const getCart = async () => {
    const cart = await commerce.cart.retrieve()
    setCart(cart)
    setLoading(false)
  }

  const addToCart = async (productId: string, quantity?: number) => {
    // if quantity is undefined, it is by default 1
    const response = await commerce.cart.add(productId, quantity)

    if (response.success) {
      setCart(response.cart)
    }
  }

  const cartContextData = {
    loading,
    cart,
    getCart,
    addToCart
  }

  return (
    <CartContext.Provider value={cartContextData}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
