//Tabela de faturas pós pago

import { Card, Grid } from '@mui/material'
import CardEditarApp from '../components/CardEditarApp'
import TimelinePartner from '../components/TimeLine'

//* Componente Principal
const Gerenciar = () => {
  // ** Vars

  return (
    <Grid container spacing={2}>
      <Grid item xs={5} lg={5} sm={12}>
        <CardEditarApp />
      </Grid>
      <Grid item xs={7} lg={7} sm={12}>
        <Card>
          <TimelinePartner />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Gerenciar
