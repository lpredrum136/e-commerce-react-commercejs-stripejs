// First way: Use vanilla react-hook-form.
// One shortcoming of this way: You will need to pass "register" from the whole <Form /> as props to this <FormInput />

import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { FieldError, UseFormRegister } from 'react-hook-form'
import { AddressFormInput } from './AddressForm'

interface Option {
  label: string
  value?: string | number
}

interface CommonFormInput {
  label: string
  name: keyof AddressFormInput
  register: UseFormRegister<AddressFormInput>
  error?: FieldError
  required?: boolean
  id?: string
}

type TextFieldFormInput = CommonFormInput & {
  type: 'text'
}

type SelectFormInput = CommonFormInput & {
  disabledOptionLabel: string
  options: Option[]
  type: 'select'
}

type Props = TextFieldFormInput | SelectFormInput

const RegisteredFormInput = (props: Props) => {
  const { type, label, name, register, error, required, id } = props

  const formattedLabel = `${label}${required ? ' *' : ''}`

  const defaultInputProps = {
    error: !!error,
    fullWidth: true,
    variant: 'standard' as const
  }

  return (
    <Grid item xs={6}>
      {type === 'text' ? (
        <TextField
          {...defaultInputProps}
          helperText={error?.type === 'required' && 'This field is required'}
          label={formattedLabel} // you can use required={required} but it messes up validation (error and helperText above)
          {...register(name, { required })}
        />
      ) : (
        <FormControl {...defaultInputProps}>
          <InputLabel id={id}>{formattedLabel}</InputLabel>
          <Select
            labelId={id}
            id={id}
            defaultValue=""
            {...register(name, { required })}
          >
            {/* Default value at start */}
            <MenuItem value="" disabled>
              {props.disabledOptionLabel}
            </MenuItem>

            {props.options.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
          {error?.type === 'required' && (
            <FormHelperText>This field is required</FormHelperText>
          )}
        </FormControl>
      )}
    </Grid>
  )
}

export default RegisteredFormInput
