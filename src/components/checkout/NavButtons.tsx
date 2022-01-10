import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const NavButtons = ({
  goNextStepDisabled,
  backLabel,
  forwardLabel,
  backAction,
  backLink
}: {
  backLabel: string
  forwardLabel: string
  goNextStepDisabled?: boolean
  backAction?: () => void
  backLink?: string
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '1rem'
      }}
    >
      <Button
        {...(backLink ? { component: Link, to: backLink } : {})}
        {...(backAction
          ? {
              onClick: () => {
                backAction()
              }
            }
          : {})}
        variant="outlined"
        color="inherit"
        startIcon={<ArrowBackIcon />}
      >
        {backLabel}
      </Button>
      <Button
        type="submit"
        variant="contained"
        endIcon={<ArrowForwardIcon />}
        disabled={goNextStepDisabled}
      >
        {forwardLabel}
      </Button>
    </Box>
  )
}

export default NavButtons
