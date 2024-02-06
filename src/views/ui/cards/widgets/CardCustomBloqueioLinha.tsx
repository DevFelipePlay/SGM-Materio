// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'

const CardCustomBloqueioLinha = () => {
  // ** Hook

  return (
    <Card>
      <CardHeader
        title='Bloquear / Desbloquar'
        titleTypographyProps={{
          sx: { lineHeight: '1 rem !important', letterSpacing: '0.15px !important' }
        }}
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <Grid item xs={12}>
          <Typography variant='body2'>Voz - Origina</Typography>
          <RadioGroup row aria-label='voz' name='voz'>
            <FormControlLabel value='voz-checked' control={<Radio />} label='Bloquear' />
            <FormControlLabel value='voz-unchecked' control={<Radio />} label='Desbloquear' />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2'>SMS</Typography>
          <RadioGroup row aria-label='sms' name='sms'>
            <FormControlLabel value='sms-checked' defaultChecked control={<Radio />} label='Bloquear' />
            <FormControlLabel value='sms-unchecked' control={<Radio />} label='Desbloquear' />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2'>Dados</Typography>
          <RadioGroup row aria-label='dados' name='dados'>
            <FormControlLabel value='dados-checked' defaultChecked control={<Radio />} label='Bloquear' />
            <FormControlLabel value='dados-unchecked' control={<Radio />} label='Desbloquear' />
          </RadioGroup>
        </Grid>
        <Button fullWidth variant='contained' sx={{ mt: 4 }}>
          Atualizar
        </Button>
      </CardContent>
    </Card>
  )
}

export default CardCustomBloqueioLinha
