import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShippingContext } from '../../contexts/shipping'
import Spinner from '../layout/Spinner'

const StyledTypography = styled(Typography)`
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const Confirmation = () => {
  const { order, error } = useContext(ShippingContext)

  if (!order?.customer) return <Spinner customHeight="100px" />

  return (
    <>
      {error && <Alert severity="warning">{error}</Alert>}
      <StyledTypography variant="h5">
        Thank you for your purchase, {order.customer.firstname}{' '}
        {order.customer.lastname}
      </StyledTypography>
      <Divider sx={{ marginY: '1rem' }} />
      <StyledTypography variant="subtitle2">
        Order Reference: {order.customer_reference}
      </StyledTypography>
      <Button variant="outlined" component={Link} to="/">
        Back to Home
      </Button>
    </>
  )
}

export default Confirmation
