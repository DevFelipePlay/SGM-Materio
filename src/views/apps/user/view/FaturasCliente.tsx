// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CustomDataGrid from 'src/components/CustomDataGrid/CustomDataGrid'
import { GridColDef } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  {
    flex: 0.1,
    minWidth: 100,
    field: 'dataGeracao',
    headerName: 'Data de Geração'
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'dataPagamento',
    headerName: 'Data de Pagamento'
  },
  {
    flex: 0.125,
    field: 'idPagamento',
    minWidth: 100,
    headerName: 'Id do Pagamento'
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'tipoFatura',
    headerName: 'Tipo de Fatura'
  },
  {
    flex: 0.025,
    minWidth: 100,
    field: 'valor',
    headerName: 'Valor'
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'status',
    headerName: 'Status'
  }
]

const rows = [
  {
    id: 1,
    dataGeracao: '25/12/2022',
    dataPagamento: '07/03/2023',
    idPagamento: 'pay_8360313432649612',
    tipoFatura: 'Alteração de Plano',
    valor: 'R$ 29,90',
    status: 'Confirmado'
  }
]

const FaturasCliente = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <CustomDataGrid columns={columns} rows={rows} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default FaturasCliente
