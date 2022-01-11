import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture'
import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response'
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'
import { AddressFormInput } from '../components/checkout/AddressForm'
import { shapeResponse } from '../helpers/shapeResponse'
import commerce from '../lib/commerce'
import { CartContext } from './cart'

interface Country {
  label: string
  value?: string
}

interface Subdivision {
  label: string
  value?: string
}

interface Method {
  label: string
  value?: string
}

type FakeCheckoutCaptureResponse = Pick<
  CheckoutCaptureResponse,
  'customer' | 'customer_reference'
>

interface ShippingContextDefault {
  loading: boolean
  shippingCountries: Country[]
  shippingSubdivisions: Subdivision[]
  shippingMethods: Method[]
  getShippingCountries: () => Promise<void>
  getShippingSubdivisions: (countryCode: string) => Promise<void>
  getShippingMethods: (
    countryCode: string,
    subdivisionCode?: string
  ) => Promise<void>
  setShippingAddressData: Dispatch<SetStateAction<AddressFormInput | undefined>>
  setError: Dispatch<SetStateAction<string | undefined>>
  setLoading: Dispatch<SetStateAction<boolean>>
  captureCheckout: (newOrder: CheckoutCapture) => Promise<void>
  refreshCart: () => Promise<void>
  getToken: () => Promise<void>
  shippingAddressData?: AddressFormInput
  token?: CheckoutToken
  order?: CheckoutCaptureResponse | FakeCheckoutCaptureResponse
  error?: string
}

const defaultShippingState: Pick<
  ShippingContextDefault,
  'loading' | 'shippingCountries' | 'shippingSubdivisions' | 'shippingMethods'
> = {
  loading: false,
  shippingCountries: [],
  shippingSubdivisions: [],
  shippingMethods: []
}

export const ShippingContext = createContext<ShippingContextDefault>({
  ...defaultShippingState,
  getShippingCountries: () => Promise.resolve(),
  getShippingSubdivisions: () => Promise.resolve(),
  getShippingMethods: () => Promise.resolve(),
  setShippingAddressData: () => {},
  captureCheckout: () => Promise.resolve(),
  refreshCart: () => Promise.resolve(),
  setError: () => {},
  setLoading: () => {},
  getToken: () => Promise.resolve()
})

const ShippingContextProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(defaultShippingState.loading)
  const [shippingCountries, setShippingCountries] = useState<Country[]>(
    defaultShippingState.shippingCountries
  )
  const [shippingMethods, setShippingMethods] = useState<Method[]>(
    defaultShippingState.shippingMethods
  )
  const [shippingSubdivisions, setShippingSubdivisions] = useState<
    Subdivision[]
  >(defaultShippingState.shippingSubdivisions)
  const [token, setToken] = useState<CheckoutToken>()
  const [shippingAddressData, setShippingAddressData] =
    useState<AddressFormInput>()
  const [order, setOrder] = useState<
    CheckoutCaptureResponse | FakeCheckoutCaptureResponse
  >()
  const [error, setError] = useState<string>()

  // Step 0: Get checkout token
  // Go over to cart store to get cart, also setCart for step 5
  const { cart, setCart } = useContext(CartContext)

  const getToken = async () => {
    console.log('GETTING TOKEN')
    const token = await commerce.checkout.generateToken(cart!.id, {
      type: 'cart'
    })
    setToken(token)
  }

  // Step 1: Get shipping countries

  const getShippingCountries = async () => {
    setLoading(true)
    const { countries } = await commerce.services.localeListCountries()
    const shapedCountries: Country[] = shapeResponse(countries)

    setShippingCountries(shapedCountries)
    setLoading(false)
  }

  // Step 2: Get shipping subdivisions
  const getShippingSubdivisions = async (countryCode: string) => {
    setLoading(true)
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    )
    const shapedSubdivisions: Subdivision[] = shapeResponse(subdivisions)
    setShippingSubdivisions(shapedSubdivisions)
    setLoading(false)
  }

  // Step 3: Get shipping methods

  const getShippingMethods = async (
    countryCode: string,
    subdivisionCode?: string
  ) => {
    if (!token) return

    setLoading(true)

    const response = await commerce.checkout.getShippingOptions(token.id, {
      country: countryCode,
      region: subdivisionCode
    })

    setShippingMethods(
      response.map(method => ({
        label: `${method.description} - ${method.price.formatted_with_symbol}`,
        value: method.id
      }))
    )

    setLoading(false)
  }

  // Step 4: Complete order
  const captureCheckout = async (newOrder: CheckoutCapture) => {
    if (!token) return

    try {
      const incomingOrder = await commerce.checkout.capture(token.id, newOrder)
      setOrder(incomingOrder)
    } catch (error) {
      console.log(
        'ERROR - EXPECTED SINCE WE DO NOT HAVE CREDIT CARD TO LINK COMMERCE AND STRIPE',
        error
      )

      setError(
        'An error happened as expected since we do not have credit card to link Commerce and Stripe'
      )
      // set fake completed Order

      if (shippingAddressData) {
        setOrder({
          customer: {
            firstname: shippingAddressData.firstName,
            lastname: shippingAddressData.lastName,
            email: shippingAddressData.email
          },
          customer_reference: 'MY_FAKE_ORDER_REFERENCE'
        })
      }
    }
  }

  // Step 5: Since this Cart has successfully been turned into an Order, we "refresh Cart", i.e. create a new Cart in commerce.js
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
  }

  const shippingContextData = {
    loading,
    shippingCountries,
    shippingSubdivisions,
    shippingMethods,
    getShippingCountries,
    getShippingSubdivisions,
    getShippingMethods,
    setShippingAddressData,
    shippingAddressData,
    token,
    captureCheckout,
    refreshCart,
    setError,
    error,
    order,
    setLoading,
    getToken
  }

  return (
    <ShippingContext.Provider value={shippingContextData}>
      {children}
    </ShippingContext.Provider>
  )
}

export default ShippingContextProvider
