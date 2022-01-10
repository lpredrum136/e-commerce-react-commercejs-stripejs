import { Cart } from '@chec/commerce.js/types/cart'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from 'react'
import commerce from '../lib/commerce'

interface CartContextDefault {
  loading: boolean
  cart?: Cart
  setCart: Dispatch<SetStateAction<Cart | undefined>>
  getCart: () => Promise<void>
  updateCart: (productId: string, operation: 'add' | 'remove') => Promise<void>
  emptyCart: () => Promise<void>
}

export const CartContext = createContext<CartContextDefault>({
  loading: true,
  getCart: () => Promise.resolve(),
  updateCart: () => Promise.resolve(),
  emptyCart: () => Promise.resolve(),
  setCart: () => {}
})

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true)

  const [cart, setCart] = useState<Cart>()

  const getCart = async () => {
    const cart = await commerce.cart.retrieve()
    setCart(cart)
    setLoading(false)
  }

  const updateCart: CartContextDefault['updateCart'] = async (
    productId: string,
    operation: 'add' | 'remove'
  ) => {
    // if quantity is undefined, it is by default 1. If it's smaller than 0, it's removing from cart
    const response = await commerce.cart.add(
      productId,
      operation === 'add' ? undefined : -1
    )

    if (response.success) {
      setCart(response.cart)
    }
  }

  const emptyCart = async () => {
    const response = await commerce.cart.empty()
    if (response.success) setCart(response.cart)
  }

  const cartContextData = {
    loading,
    cart,
    getCart,
    updateCart,
    emptyCart,
    setCart
  }

  return (
    <CartContext.Provider value={cartContextData}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
