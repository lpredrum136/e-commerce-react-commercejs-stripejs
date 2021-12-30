import Grid from '@mui/material/Grid'
import ProductItem from './ProductItem'

export interface Product {
  id: number
  name: string
  description: string
  price: string
  image: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'Shoes',
    description: 'Running shoes',
    price: '$5',
    image:
      'https://footwearnews.com/wp-content/uploads/2021/08/nike-zoomx-vaporfly-next.jpg'
  },
  {
    id: 2,
    name: 'Macbook',
    description: 'Apple Macbook',
    price: '$10',
    image:
      'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-space-gray-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1633027804000'
  }
]

const Products = () => {
  return (
    <main>
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product: Product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  )
}

export default Products
