import ShoppingCart from '@mui/icons-material/ShoppingCart'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useContext, useEffect } from 'react'
import logo from '../../assets/index.png'
import { CartContext } from '../../contexts/cart'

const StyledAppBar = styled(AppBar)`
  margin-bottom: 10px;
`
// export const StyledTypography = styled(Typography)`
//   flex-grow: 1;
// `
const Navbar = () => {
  const { getCart, cart } = useContext(CartContext)

  useEffect(() => {
    getCart()
  }, [])

  return (
    <StyledAppBar color="inherit" position="sticky">
      <Toolbar>
        <img src={logo} alt="henry-shop-logo" height="25px" />
        <Typography variant="h6" flexGrow={1}>
          Henry Shop
        </Typography>
        <IconButton aria-label="Show cart items" color="inherit">
          <Badge badgeContent={cart?.total_items} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  )
}

export default Navbar
