import { createContext, ReactNode, useState } from 'react'
import { shapeResponse } from '../helpers/shapeResponse'
import commerce from '../lib/commerce'

interface Country {
  label: string
  value?: string
}

interface Subdivision {
  label: string
  value?: string
}

interface ShippingContextDefault {
  shippingCountries: Country[]
  shippingSubdivisions: Subdivision[]
  getShippingCountries: () => Promise<void>
  getShippingSubdivisions: (countryCode: string) => Promise<void>
}

export const ShippingContext = createContext<ShippingContextDefault>({
  shippingCountries: [],
  shippingSubdivisions: [],
  getShippingCountries: () => Promise.resolve(),
  getShippingSubdivisions: () => Promise.resolve()
})

const ShippingContextProvider = ({ children }: { children: ReactNode }) => {
  const [shippingCountries, setShippingCountries] = useState<Country[]>([])
  const [shippingSubdivisions, setShippingSubdivisions] = useState<
    Subdivision[]
  >([])

  const getShippingCountries = async () => {
    const { countries } = await commerce.services.localeListCountries()

    const shapedCountries: Country[] = shapeResponse(countries)

    setShippingCountries(shapedCountries)
  }

  const getShippingSubdivisions = async (countryCode: string) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    )

    const shapedSubdivisions: Subdivision[] = shapeResponse(subdivisions)

    setShippingSubdivisions(shapedSubdivisions)
  }

  const shippingContextData = {
    shippingCountries,
    shippingSubdivisions,
    getShippingCountries,
    getShippingSubdivisions
  }

  return (
    <ShippingContext.Provider value={shippingContextData}>
      {children}
    </ShippingContext.Provider>
  )
}

export default ShippingContextProvider
