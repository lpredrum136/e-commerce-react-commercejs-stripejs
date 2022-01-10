import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { useContext } from 'react'
import { ShippingContext } from '../../contexts/shipping'

const OrderSummary = () => {
  const { token } = useContext(ShippingContext)

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List>
        {token?.live.line_items.map(
          (product: {
            id: string
            name: string
            quantity: number
            line_total: { formatted_with_symbol: string }
          }) => (
            <ListItem key={product.id}>
              <ListItemText
                primary={product.name}
                secondary={`Quantity: ${product.quantity}`}
              />
              <Typography variant="body2">
                {product.line_total.formatted_with_symbol}
              </Typography>
            </ListItem>
          )
        )}

        <ListItem>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" fontWeight={700}>
            {token?.live.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </>
  )
}

export default OrderSummary
