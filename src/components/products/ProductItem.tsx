import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Product } from './Products'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import AddShoppingCart from '@mui/icons-material/AddShoppingCart'
import { styled } from '@mui/material/styles'

interface Props {
  product: Product
}

const StyledCard = styled(Card)`
  max-width: 100%;
`

const StyledCardMedia = styled(CardMedia)`
  // height: 0;
  // padding-top: 56.25%; // 16:9
  border: 1px solid red;
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
        component="img"
        height="194"
        image="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-space-gray-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1633027804000"
      />
      <CardContent>
        <div>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5">{product.price}</Typography>
        </div>

        <Typography variant="h2" sx={{ color: 'text.secondary' }}>
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
