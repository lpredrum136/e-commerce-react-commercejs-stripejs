import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia, { CardMediaTypeMap } from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import AddShoppingCart from '@mui/icons-material/AddShoppingCart'
import { styled } from '@mui/material/styles'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { ElementType, useContext } from 'react'
import { Product } from '@chec/commerce.js/types/product'
import { cleanProductDescription } from '../../helpers/string'
import { CartContext } from '../../contexts/cart'
import { LineItem } from '@chec/commerce.js/types/line-item'
import Grid from '@mui/material/Grid'
import RemoveShoppingCart from '@mui/icons-material/RemoveShoppingCart'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

interface Props {
  source: 'products' | 'cart'
  product: Product | LineItem
}

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
`

// To make it work
// https://stackoverflow.com/questions/48879517/passing-props-to-mui-styles/69677803#69677803
// https://stackoverflow.com/questions/69708891/pass-object-to-material-ui-styled-component
// cach 1: nhu da lam, hover over "styled" to know why
// cach 2: const StyledCardMedia = styled(CardMedia)<{ component: string }>`...`

const StyledCardMedia = styled<
  OverridableComponent<
    CardMediaTypeMap<
      { component?: ElementType; height?: number | string },
      'div'
    >
  >
>(CardMedia)`
  padding-top: 56.25%; // 16:9
`

const StyledCardContentTypography = styled('div')`
  display: flex;
  justify-content: space-between;
`

const StyledCardActions = styled(CardActions)<{ source: 'cart' | 'products' }>`
  display: flex;
  justify-content: ${props =>
    props.source === 'cart' ? 'space-between' : 'flex-end'};
`

const ProductItem = ({ product, source }: Props) => {
  const { updateCart } = useContext(CartContext)

  return (
    <Grid item xs={3}>
      <Card>
        <StyledCardMedia
          // component="img"
          // height="500px"
          image={product.image?.url}
        />
        <CardContent>
          <StyledCardContentTypography>
            <Typography variant="h5">{product.name}</Typography>
            <Typography variant="h5">
              {source === 'products'
                ? (product as Product).price.formatted_with_symbol
                : (product as LineItem).line_total.formatted_with_symbol}
            </Typography>
          </StyledCardContentTypography>

          {source === 'products' && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {cleanProductDescription((product as Product).description)}
            </Typography>
          )}
        </CardContent>
        <StyledCardActions disableSpacing source={source}>
          {source === 'cart' && (
            <StyledBox>
              <Button
                size="small"
                onClick={() => {
                  updateCart((product as LineItem).product_id, 'remove')
                }}
              >
                -
              </Button>
              <Typography>{(product as LineItem).quantity}</Typography>
              <Button
                size="small"
                onClick={() => {
                  updateCart((product as LineItem).product_id, 'add')
                }}
              >
                +
              </Button>
            </StyledBox>
          )}
          <IconButton
            aria-label="Add to Cart"
            onClick={() => {
              updateCart(product.id, 'add')
            }}
          >
            {source === 'products' ? (
              <AddShoppingCart />
            ) : (
              <RemoveShoppingCart color="error" />
            )}
          </IconButton>
        </StyledCardActions>
      </Card>
    </Grid>
  )
}

export default ProductItem
