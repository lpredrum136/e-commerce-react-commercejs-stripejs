import { CheckoutToken } from '@chec/commerce.js/types/checkout-token'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
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
  getShippingMethods: () => Promise.resolve()
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

  // Step 3: Get shipping methods, including a couple of smaller steps

  // Go over to cart store to get cart
  const { cart } = useContext(CartContext)

  useEffect(() => {
    const getToken = async () => {
      const token = await commerce.checkout.generateToken(cart!.id, {
        type: 'cart'
      })
      setToken(token)
    }

    if (cart) getToken()
  }, [cart])

  // Get shipping methods
  const getShippingMethods = async (
    countryCode: string,
    subdivisionCode?: string
  ) => {
    if (token) {
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
  }

  const shippingContextData = {
    loading,
    shippingCountries,
    shippingSubdivisions,
    shippingMethods,
    getShippingCountries,
    getShippingSubdivisions,
    getShippingMethods
  }

  return (
    <ShippingContext.Provider value={shippingContextData}>
      {children}
    </ShippingContext.Provider>
  )
}

export default ShippingContextProvider
