// ** MUI Imports
import { Grid } from '@mui/material'
import CardCustomRecargaAdicional from 'src/views/ui/cards/widgets/CardCustomRecargaAdicional'

const UserViewNotification = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6}>
        <CardCustomRecargaAdicional nomeRecarga='Adicional 1GB' valorRecarga='8,00' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardCustomRecargaAdicional nomeRecarga='Adicional 2GB' valorRecarga='16,00' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardCustomRecargaAdicional nomeRecarga='Adicional 4GB' valorRecarga='30,00' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardCustomRecargaAdicional nomeRecarga='Adicional 8GB' valorRecarga='58,00' />
      </Grid>
    </Grid>
  )
}

export default UserViewNotification
