import { Product } from '@chec/commerce.js/types/product'
import { createContext, ReactNode, useState } from 'react'
import commerce from '../lib/commerce'

interface ProductContextDefault {
  loading: boolean
  products: Product[]
  getProducts: () => Promise<void>
}

export const ProductContext = createContext<ProductContextDefault>({
  loading: true,
  products: [],
  getProducts: () => Promise.resolve()
})

const ProductContextProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true)

  const [products, setProducts] = useState<Product[]>([])

  const getProducts = async () => {
    const { data } = await commerce.products.list()
    setProducts(data)
    setLoading(false)
  }

  const productContextData = {
    loading,
    products,
    getProducts
  }

  return (
    <ProductContext.Provider value={productContextData}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContextProvider
