import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'

const StyledBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - ${theme.mixins.toolbar.minHeight}px);
  `
)

const Spinner = () => (
  <StyledBox>
    <CircularProgress />
  </StyledBox>
)

export default Spinner
