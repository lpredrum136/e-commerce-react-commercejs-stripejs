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
import { Link } from 'react-router-dom'

const StyledBox = styled(Box)`
  display: flex;
  margin-top: 30px;
  margin-bottom: 30px;
  align-items: center;
`

const Cart = () => {
  const { loading, cart, emptyCart } = useContext(CartContext)

  const isEmpty = !cart?.total_items

  const emptiedCart = (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        You have no items in your shopping cart
      </Typography>
      <Button variant="outlined" component={Link} to="/">
        Shop now
      </Button>
    </Box>
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
          Total: {cart?.subtotal.formatted_with_symbol}
        </Typography>
        <Button
          size="large"
          color="error"
          variant="contained"
          sx={{ marginRight: '5px' }}
          onClick={emptyCart.bind(this)}
        >
          Empty Cart
        </Button>
        <Button
          size="large"
          color="primary"
          variant="contained"
          component={Link}
          to="/checkout"
        >
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
      {loading ? <Spinner /> : isEmpty ? emptiedCart : filledCart}
    </Container>
  )
}

export default Cart
