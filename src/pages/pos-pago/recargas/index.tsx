// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'

// ** Custom Components Imports
import { Icon } from '@iconify/react'
import { Divider, IconButton, Tooltip, Typography } from '@mui/material'
import CustomDataGrid from 'src/components/CustomDataGrid/CustomDataGrid'
import { GridColDef } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'name',
    headerName: 'Nome'
  },
  {
    flex: 0.125,
    minWidth: 150,
    field: 'cpfcnpj',
    headerName: 'CPF / CNPJ'
  },
  {
    flex: 0.125,
    field: 'msisdn',
    minWidth: 150,
    headerName: 'MSISDN'
  },
  {
    flex: 0.125,
    field: 'iccid',
    minWidth: 200,
    headerName: 'ICCID'
  },
  {
    flex: 0.0875,
    minWidth: 200,
    field: 'dataVencimento',
    headerName: 'Data de Vencimento'
  },
  {
    flex: 0.0875,
    minWidth: 150,
    field: 'tipoFatura',
    headerName: 'Tipo de Fatura'
  },
  {
    flex: 0.05,
    minWidth: 100,
    field: 'actions',
    headerName: 'Ações',
    renderCell: row => (
      <Tooltip title='Recarregar Linha'>
        <IconButton color='info'>
          <Icon icon='mdi:check' fontSize={20} />
        </IconButton>
      </Tooltip>
    )
  }
]

const rows = [
  {
    id: 1,
    name: 'Maria De Fatima Oliveira Da Silva',
    cpfcnpj: '008.913.031-62',
    msisdn: '(61) 98654-0914',
    iccid: '8955170110322410810',
    dataVencimento: '19/12/2023',
    tipoFatura: 'Mensalidade'
  },
  {
    id: 2,
    name: 'Lucas Gustavo Lopes',
    cpfcnpj: '045.858.431-24',
    msisdn: '(61) 92003-6258',
    iccid: '8955170110322413293',
    dataVencimento: '09/01/2023',
    tipoFatura: 'Mensalidade'
  }
]

const RecargasPosPago = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{ px: 4 }}>
          <CardHeader title={<Typography variant='h5'>Recargas</Typography>} />
          <Divider />
          <CustomDataGrid
            columns={columns}
            rows={rows}
            placeholderSearch='Buscar Cliente'
            titleButton='Novo Cliente'
            hasButton={false}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default RecargasPosPago
