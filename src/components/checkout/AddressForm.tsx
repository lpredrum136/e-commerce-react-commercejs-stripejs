import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useContext, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ShippingContext } from '../../contexts/shipping'
import NavButtons from './NavButtons'
import RegisteredFormInput from './RegisteredFormInput'
// import ControlledFormInput from './ControlledFormInput'

export interface AddressFormInput {
  firstName: string
  lastName: string
  address: string
  email: string
  city: string
  zip: string
  shippingCountry: string
  shippingSubdivision: string
  shippingMethod: string
}

const AddressForm = ({ goNextStep }: { goNextStep: () => void }) => {
  // Shipping details
  const {
    loading,
    getShippingCountries,
    shippingCountries,
    getShippingSubdivisions,
    shippingSubdivisions,
    getShippingMethods,
    shippingMethods,
    setShippingAddressData
  } = useContext(ShippingContext)

  useEffect(() => {
    getShippingCountries()
  }, [])

  // First way: Use <FormInput /> above
  // This works but register needs to be passed from this <Form> to the <FormInput /> above

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    resetField,
    formState: { errors }
  } = useForm<AddressFormInput>()

  const shippingCountry = watch('shippingCountry')
  const shippingSubdivision = watch('shippingSubdivision')

  // Get shipping subdivisions based on selected shipping country
  useEffect(() => {
    if (shippingCountry) {
      // setValue('shippingSubdivision', '')
      resetField('shippingSubdivision', { defaultValue: '' }) // kinda the same as setValue() ?
      getShippingSubdivisions(shippingCountry)
    }
  }, [shippingCountry])

  // Get shipping methods based on selected shipping country and selected shipping subdivision
  useEffect(() => {
    if (shippingSubdivision) {
      getShippingMethods(shippingCountry, shippingSubdivision)
    }
  }, [shippingSubdivision])

  // Second (proper?) way:
  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm<AddressFormInput>(
  //   // this object {defaultValues: ...} is compulsory when it is controlled input
  //   // because it always needs an initial value
  //   // otherwise, you'll see error in console
  //   {
  //     defaultValues: {
  //       firstName: ''
  //     }
  //   }
  // )

  console.log('ERRORS', errors)

  const onSubmit: SubmitHandler<AddressFormInput> = data => {
    // This only runs when there's no validation errors (errors from formState)
    console.log('submitted', data)
    console.log('errors', errors) // so this console.log doesn't really mean anything, because it only reaches this line if there's no error

    setShippingAddressData(data)
    goNextStep()
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* <Grid item xs={6}>
            <TextField
              label="Name"
              variant="standard"
              fullWidth
              required
              {...register('firstName')}
            />
          </Grid> */}

          {/* First way: Use with vanilla react hook form, using <FormInput /> above */}

          <RegisteredFormInput
            type="text"
            label="First Name"
            name="firstName"
            register={register}
            required
            error={errors.firstName}
          />
          <RegisteredFormInput
            type="text"
            label="Last Name"
            name="lastName"
            register={register}
            required
            error={errors.lastName}
          />
          <RegisteredFormInput
            type="text"
            label="Address"
            name="address"
            register={register}
            required
            error={errors.address}
          />
          <RegisteredFormInput
            type="text"
            label="Email Name"
            name="email"
            register={register}
            required
            error={errors.email}
          />
          <RegisteredFormInput
            type="text"
            label="City"
            name="city"
            register={register}
            required
            error={errors.city}
          />
          <RegisteredFormInput
            type="text"
            label="ZIP / Postal code"
            name="zip"
            register={register}
            required
            error={errors.zip}
          />

          <RegisteredFormInput
            type="select"
            label="Shipping Country"
            disabledOptionLabel="Select Country"
            name="shippingCountry"
            id="shipping-country-select"
            register={register}
            required
            error={errors.shippingCountry}
            options={shippingCountries}
            disabled={loading}
          />
          <RegisteredFormInput
            type="select"
            label="Shipping Subdivision"
            disabledOptionLabel="Select Subdivision"
            name="shippingSubdivision"
            id="shipping-subdivision-select"
            register={register}
            required
            error={errors.shippingSubdivision}
            options={shippingSubdivisions}
            disabled={loading}
          />
          <RegisteredFormInput
            type="select"
            label="Shipping Method"
            disabledOptionLabel="Select Method"
            name="shippingMethod"
            id="shipping-method-select"
            register={register}
            required
            error={errors.shippingMethod}
            options={shippingMethods}
            disabled={loading}
          />

          {/* Second way, written inline just to test */}

          {/* <Grid item xs={6}>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  label="First Name"
                  fullWidth
                  // required
                />
              )}
            />
          </Grid> */}

          {/* Second way, refactored */}

          {/* <ControlledFormInput
            name="firstName"
            label="First Name"
            control={control}
          /> */}
        </Grid>

        <NavButtons
          backLabel="Back to Cart"
          backLink="/cart"
          forwardLabel="Next"
        />
      </Box>
    </>
  )
}

export default AddressForm
