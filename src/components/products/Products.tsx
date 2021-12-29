import Grid from '@mui/material/Grid'
import ProductItem from './ProductItem'

export interface Product {
  id: number
  name: string
  description: string
  price: string
}

const products: Product[] = [
  { id: 1, name: 'Shoes', description: 'Running shoes', price: '$5' },
  { id: 2, name: 'Macbook', description: 'Apple Macbook', price: '$10' },
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
