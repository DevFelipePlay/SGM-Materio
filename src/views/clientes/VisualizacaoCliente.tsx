// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

import VisualizacaoEsquerdaCliente from './VisualizacaoEsquerdaCliente'
import VisualizacaoDireitaCliente from './VisualizacaoDireitaCliente'

type Props = {
  tab: string
  invoiceData: InvoiceType[]
  userID: string
  user: any
}

const VisualizacaoCliente = ({ tab, invoiceData, userID, user }: Props) => {
  console.log(user)

  return (
    <Grid container spacing={6}>
      {tab !== 'cobrancas' && (
        <Grid item xs={12} md={5} lg={4}>
          <VisualizacaoEsquerdaCliente userData={user} />
        </Grid>
      )}
      {tab === 'cobrancas' ? (
        <Grid item xs={12}>
          <VisualizacaoDireitaCliente tab={tab} invoiceData={invoiceData} userID={userID} />
        </Grid>
      ) : (
        <Grid item xs={12} md={7} lg={8}>
          <VisualizacaoDireitaCliente tab={tab} invoiceData={invoiceData} userID={userID} />
        </Grid>
      )}
    </Grid>
  )
}

export default VisualizacaoCliente
