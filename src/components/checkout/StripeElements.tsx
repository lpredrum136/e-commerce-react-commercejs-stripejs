import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture'
import Box from '@mui/material/Box'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { StripeCardElement } from '@stripe/stripe-js'
import { FormEvent, useContext } from 'react'
import { ShippingContext } from '../../contexts/shipping'
import NavButtons from './NavButtons'

const StripeElements = ({
  goBackStep,
  goNextStep
}: {
  goBackStep: () => void
  goNextStep: () => void
}) => {
  // Stripe js stuff
  const stripe = useStripe()
  const elements = useElements()

  const {
    shippingAddressData,
    token,
    captureCheckout,
    refreshCart,
    setOrderFinished
  } = useContext(ShippingContext)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!stripe || !elements || !shippingAddressData) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    const cardElement = elements.getElement(CardElement) as StripeCardElement

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    })

    if (error) {
      console.log(error)
      return
    }

    const {
      firstName,
      lastName,
      email,
      address,
      city,
      shippingCountry,
      shippingMethod,
      shippingSubdivision,
      zip
    } = shippingAddressData

    const orderData: CheckoutCapture = {
      line_items: token?.live.line_items,
      customer: {
        firstname: firstName,
        lastname: lastName,
        email: email
      },
      shipping: {
        name: 'Primary',
        street: address,
        town_city: city,
        county_state: shippingSubdivision,
        postal_zip_code: zip,
        country: shippingCountry
      },
      fulfillment: { shipping_method: shippingMethod },
      payment: {
        gateway: 'stripe',
        stripe: { payment_method_id: paymentMethod?.id }
      }
    }

    await captureCheckout(orderData)
    await refreshCart()
    setOrderFinished(true)
    goNextStep()
  }

  return (
    <Box component="form" onSubmit={onSubmit}>
      <CardElement />
      <NavButtons
        goNextStepDisabled={!stripe}
        backLabel="Back"
        backAction={goBackStep}
        forwardLabel={`Pay ${token?.live.subtotal.formatted_with_symbol}`}
      />
    </Box>
  )
}

export default StripeElements
