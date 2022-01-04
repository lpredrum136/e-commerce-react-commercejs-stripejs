import { createContext, ReactNode, useState } from 'react'
import commerce from '../lib/commerce'

interface Country {
  label: string
  value?: string
}

interface ShippingContextDefault {
  shippingCountries: Country[]
  getShippingCountries: () => Promise<void>
}

export const ShippingContext = createContext<ShippingContextDefault>({
  shippingCountries: [],
  getShippingCountries: () => Promise.resolve()
})

const ShippingContextProvider = ({ children }: { children: ReactNode }) => {
  const [shippingCountries, setShippingCountries] = useState<Country[]>([])

  const getShippingCountries = async () => {
    const { countries } = await commerce.services.localeListCountries()

    const shapedCountries: Country[] = Object.entries(countries).map(
      ([countryCode, countryName]) => ({
        value: countryCode,
        label: countryName
      })
    )

    setShippingCountries(shapedCountries)
  }

  const shippingContextData = { shippingCountries, getShippingCountries }

  return (
    <ShippingContext.Provider value={shippingContextData}>
      {children}
    </ShippingContext.Provider>
  )
}

export default ShippingContextProvider
