import ShoppingCart from '@mui/icons-material/ShoppingCart'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import logo from '../../assets/index.png'

const StyledAppBar = styled(AppBar)`
  margin-bottom: 10px;
`
const StyledTypography = styled(Typography)`
  flex-grow: 1;
`
const Navbar = () => {
  return (
    <StyledAppBar color="inherit" position="sticky">
      <Toolbar>
        <img src={logo} alt="henry-shop-logo" height="25px" />
        <StyledTypography variant="h6">Henry Shop</StyledTypography>
        <IconButton aria-label="Show cart items" color="inherit">
          <Badge badgeContent={2} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  )
}

export default Navbar
