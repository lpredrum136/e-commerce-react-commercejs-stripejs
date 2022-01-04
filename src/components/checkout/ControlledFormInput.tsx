import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Controller, Control } from 'react-hook-form'
import { AddressFormInput } from './AddressForm'

const ControlledFormInput = ({
  name,
  label,
  control
}: {
  name: keyof AddressFormInput
  label: string
  control: Control<AddressFormInput, object>
}) => {
  return (
    <Grid item xs={6}>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            variant="standard"
            label={label}
            fullWidth
            required
          />
        )}
      />
    </Grid>
  )
}

export default ControlledFormInput
