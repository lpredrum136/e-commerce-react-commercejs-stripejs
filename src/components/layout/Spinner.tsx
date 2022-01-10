import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'

interface Props {
  customHeight?: string
}

const StyledBox = styled(Box)<Props>(
  ({ theme, customHeight }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${
      customHeight || `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`
    };
  `
)

const Spinner = ({ customHeight }: Props) => (
  <StyledBox customHeight={customHeight}>
    <CircularProgress />
  </StyledBox>
)

export default Spinner
