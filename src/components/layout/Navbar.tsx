import ShoppingCart from '@mui/icons-material/ShoppingCart'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
  const { pathname } = useLocation()

  useEffect(() => {
    getCart()
  }, [])

  return (
    <StyledAppBar color="inherit" position="sticky">
      <Toolbar>
        <img src={logo} alt="henry-shop-logo" height="25px" />
        <Typography
          variant="h6"
          flexGrow={1}
          component={Link}
          to="/"
          sx={{ color: 'inherit', textDecoration: 'none' }}
        >
          Henry Shop
        </Typography>
        {pathname !== '/cart' && (
          <IconButton
            aria-label="Show cart items"
            color="inherit"
            component={Link}
            to="/cart"
          >
            <Badge badgeContent={cart?.total_items} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        )}
      </Toolbar>
    </StyledAppBar>
  )
}

export default Navbar
