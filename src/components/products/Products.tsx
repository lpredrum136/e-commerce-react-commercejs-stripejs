import Grid from '@mui/material/Grid'
import { useContext, useEffect } from 'react'
import { ProductContext } from '../../contexts/product'
import ProductItem from '../layout/ProductItem'
import Spinner from '../layout/Spinner'

// export interface Product {
//   id: number
//   name: string
//   description: string
//   price: string
//   image: string
// }

// const products: Product[] = [
//   {
//     id: 1,
//     name: 'Shoes',
//     description: 'Running shoes',
//     price: '$5',
//     image:
//       'https://footwearnews.com/wp-content/uploads/2021/08/nike-zoomx-vaporfly-next.jpg'
//   },
//   {
//     id: 2,
//     name: 'Macbook',
//     description: 'Apple Macbook',
//     price: '$10',
//     image:
//       'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-space-gray-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1633027804000'
//   }
// ]

const Products = () => {
  const { loading, products, getProducts } = useContext(ProductContext)

  useEffect(() => {
    getProducts()
  }, [])

  if (loading) return <Spinner />

  return (
    <Grid container justifyContent="center" spacing={4} padding="20px">
      {products.map(product => (
        <ProductItem source="products" product={product} key={product.id} />
      ))}
    </Grid>
  )
}

export default Products
