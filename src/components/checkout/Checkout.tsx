import Paper from '@mui/material/Paper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useContext, useEffect, useState } from 'react'
import Confirmation from './Confirmation'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import { CartContext } from '../../contexts/cart'
import { useNavigate } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { ShippingContext } from '../../contexts/shipping'

const steps = ['Shipping Address', 'Payment Details']

const StyledPaper = styled(Paper)`
  width: 50%;
  margin: auto;
  padding: 20px;
`

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0)
  const orderFinished = activeStep === steps.length
  const { loading, cart } = useContext(CartContext)
  const { order } = useContext(ShippingContext)
  const navigate = useNavigate()

  // Route protection
  useEffect(() => {
    if (!orderFinished && !loading && !cart?.line_items.length && !order)
      navigate('/')
  }, [orderFinished, loading, cart, order])

  const goNextStep = () => setActiveStep(activeStep + 1)
  const goBackStep = () => setActiveStep(activeStep - 1)

  // Important: if you do it like JS Mastery: const Form = () => active...., it will cause endless loop of calling getShippingCountries
  // Probably because AddressForm has a useEffect to call getShippingCountries() => ShippingContext gets changed => so when we do const {...} = useContext(ShippingContext)
  // in this component, since ShippingContext has been changed, it rerender this whole checkout Component, causing AddressForm to rerender => infinite loop
  const form =
    activeStep === 0 ? (
      <AddressForm goNextStep={goNextStep} />
    ) : (
      <PaymentForm goBackStep={goBackStep} goNextStep={goNextStep} />
    )

  if (loading) return <Spinner />

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h4" align="center">
        Checkout
      </Typography>
      <Stepper activeStep={activeStep} sx={{ marginY: '1rem' }}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? <Confirmation /> : form}
    </StyledPaper>
  )
}

export default Checkout
