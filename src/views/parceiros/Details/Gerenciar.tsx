//Tabela de faturas pós pago

import { Grid } from '@mui/material'
import CardEditarApp from '../components/CardEditarApp'
import TimelinePartner from '../components/TimeLine'
import CardEnvios from '../components/CardEnvios'
import CardInserirICCID from '../components/CardInserirICCID'

//* Componente Principal
const Gerenciar = () => {
  // ** Vars

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={5} sm={12}>
        <CardEditarApp />
        <CardInserirICCID />
      </Grid>
      <Grid item xs={12} lg={7} sm={12}>
        <TimelinePartner />
        <CardEnvios />
      </Grid>
    </Grid>
  )
}

export default Gerenciar
