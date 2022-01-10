import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import OrderSummary from './OrderSummary'
import StripeElements from './StripeElements'

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLIC_KEY as string
)

const PaymentForm = ({
  goBackStep,
  goNextStep
}: {
  goBackStep: () => void
  goNextStep: () => void
}) => {
  return (
    <>
      <OrderSummary />
      <Divider />
      <Typography variant="h6" gutterBottom sx={{ marginY: '1rem' }}>
        Payment Method
      </Typography>
      <Alert severity="info" sx={{ marginY: '1rem' }}>
        For this project, fill 4242 4242 4242 4242 - 04/24 - 242 - 42424
      </Alert>
      <Elements stripe={stripePromise}>
        <StripeElements goBackStep={goBackStep} goNextStep={goNextStep} />
      </Elements>
    </>
  )
}

export default PaymentForm
