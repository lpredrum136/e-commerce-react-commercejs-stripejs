import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart'
import ProductItem from '../layout/ProductItem'
import Spinner from '../layout/Spinner'
import { styled } from '@mui/material/styles'
// import { StyledTypography } from '../layout/Navbar'

const StyledBox = styled(Box)`
  display: flex;
  margin-top: 30px;
  align-items: center;
`

const Cart = () => {
  const { loading, cart } = useContext(CartContext)

  console.log('CARTTT', cart)

  const isEmpty = !cart?.total_items

  const emptyCart = (
    <Typography variant="h1">
      You have no items in your shopping cart
    </Typography>
  )

  const filledCart = (
    <>
      <Grid container spacing={4}>
        {cart?.line_items.map(item => (
          <ProductItem product={item} key={item.id} source="cart" />
        ))}
      </Grid>
      <StyledBox>
        <Typography variant="h5" flexGrow={1}>
          Subtotal: {cart?.subtotal.formatted_with_symbol}
        </Typography>
        <Button
          size="large"
          color="error"
          variant="contained"
          sx={{ marginRight: '5px' }}
        >
          Empty Cart
        </Button>
        <Button size="large" color="primary" variant="contained">
          Checkout
        </Button>
      </StyledBox>
    </>
  )

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Shopping Cart
      </Typography>
      {loading ? <Spinner /> : isEmpty ? emptyCart : filledCart}
    </Container>
  )
}

export default Cart
