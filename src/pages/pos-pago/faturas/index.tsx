// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'

// ** Custom Components Imports
import { Divider, IconButton, Tooltip, Typography } from '@mui/material'
import CustomDataGrid from 'src/components/CustomDataGrid/CustomDataGrid'
import { GridColDef } from '@mui/x-data-grid'
import { Icon } from '@iconify/react'
import useClipboard from 'src/@core/hooks/useClipboard'
import toast from 'react-hot-toast'
import CustomChip from 'src/@core/components/mui/chip'

const userStatusObj: any = {
  confirmado: {
    text: 'Confirmado',
    color: 'success'
  },
  pendente: {
    text: 'Pendente',
    color: 'warning'
  }
}

const rows = [
  {
    id: 1,
    dataGeracao: '16/01/2024',
    dataPagamento: '20/01/2024',
    idPagamento: 'pay_zu438x5i9cd9b21o',
    tipoFatura: 'SISTEMA-POS',
    valor: 'R$ 1.348,45',
    status: 'pendente'
  },
  {
    id: 2,
    dataGeracao: '28/01/2024',
    dataPagamento: '28/01/2024',
    idPagamento: 'pay_nzdk7qhbn0zqelze',
    tipoFatura: 'SISTEMA-POS',
    valor: 'R$ 1.528,30',
    status: 'confirmado'
  }
]

const FaturasPosPago = () => {
  // Hooks
  const { copy, target } = useClipboard({
    onSuccess: () => {
      toast.success('ID do Pagamento copiado!')
    },
    onError: () => {
      toast.error('Erro ao copiar ID do Pagamento')
    }
  })

  // Coluna Tabela

  const columns: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 150,
      field: 'dataGeracao',
      headerName: 'Data de Geração'
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'dataPagamento',
      headerName: 'Data do Pagamento'
    },
    {
      flex: 0.2,
      field: 'idPagamento',
      minWidth: 200,
      headerName: 'Id do Pagamento',
      renderCell: row => (
        <Tooltip title={'Clique para copiar'}>
          <Typography variant='inherit' ref={target} onClick={() => copy(row.value)}>
            {row.value}
          </Typography>
        </Tooltip>
      )
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'tipoFatura',
      headerName: 'Tipo de Fatura'
    },
    {
      flex: 0.075,
      minWidth: 125,
      field: 'valor',
      headerName: 'Valor'
    },
    {
      flex: 0.0875,
      minWidth: 125,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={userStatusObj[row.status].text}
            color={userStatusObj[row.status].color}
            sx={{ textTransform: 'capitalize' }}
          />
        )
      }
    },
    {
      flex: 0.05,
      minWidth: 150,
      field: 'actions',
      headerName: 'Ações',
      renderCell: row => (
        <Tooltip title='Ver Relatório'>
          <IconButton color='inherit' onClick={() => alert('VER RELATÓRIO')}>
            <Icon icon='mdi:chart-box' />
          </IconButton>
        </Tooltip>
      )
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{ px: 4 }}>
          <CardHeader title={<Typography variant='h5'>Faturas Pós-Pago</Typography>} />
          <Divider />
          <CustomDataGrid
            columns={columns}
            rows={rows}
            placeholderSearch='Buscar Cliente'
            titleButton='Novo Cliente'
            hasButton={false}
            onCellClick={params => {
              if (params.field !== 'idPagamento' && params.field !== 'actions') {
                alert('VISUALIZAR FATURA')
              }
            }}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default FaturasPosPago
