import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia, { CardMediaTypeMap } from '@mui/material/CardMedia'
import { Product } from './Products'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import AddShoppingCart from '@mui/icons-material/AddShoppingCart'
import { styled } from '@mui/material/styles'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { ElementType } from 'react'

interface Props {
  product: Product
}

const StyledCard = styled(Card)`
  // max-width: 100%;
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

const StyledCardActions = styled(CardActions)`
  display: flex;
  justify-content: flex-end;
`

const ProductItem = ({ product }: Props) => {
  return (
    <StyledCard>
      <StyledCardMedia
        // component="img"
        // height="500px"
        image={product.image}
      />
      <CardContent>
        <StyledCardContentTypography>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5">{product.price}</Typography>
        </StyledCardContentTypography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {product.description}
        </Typography>
      </CardContent>
      <StyledCardActions disableSpacing>
        <IconButton aria-label="Add to Cart">
          <AddShoppingCart />
        </IconButton>
      </StyledCardActions>
    </StyledCard>
  )
}

export default ProductItem
