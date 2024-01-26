// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const StepCadastrarMVNO = ({ handleNext, handlePrev }: { [key: string]: () => void }) => {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h5'>Personal Information</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Enter Your Personal Information</Typography>
      </Box>

      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth placeholder='john' label='First Name' />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField fullWidth label='Last Name' placeholder='Doe' />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              color='secondary'
              variant='contained'
              onClick={handlePrev}
              startIcon={<Icon icon='mdi:chevron-left' fontSize={20} />}
            >
              Previous
            </Button>
            <Button variant='contained' onClick={handleNext} endIcon={<Icon icon='mdi:chevron-right' fontSize={20} />}>
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default StepCadastrarMVNO
