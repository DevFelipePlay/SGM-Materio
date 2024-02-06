// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CustomDataGrid from 'src/components/CustomDataGrid/CustomDataGrid'
import { GridColDef } from '@mui/x-data-grid'
import { IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import useClipboard from 'src/@core/hooks/useClipboard'
import toast from 'react-hot-toast'
import { MouseEvent, useState } from 'react'
import { Icon } from '@iconify/react'
import CustomChip from 'src/@core/components/mui/chip'

const rows = [
  {
    id: 1,
    dataGeracao: '25/12/2022',
    dataPagamento: '07/03/2023',
    idPagamento: 'pay_8360313432649612',
    tipoFatura: 'Alteração de Plano',
    valor: 'R$ 29,90',
    status: 'active'
  },
  {
    id: 2,
    dataGeracao: '06/02/2024',
    dataPagamento: 'Pendente',
    idPagamento: 'pay_51gfvsz3714hksvg',
    tipoFatura: 'Mensalidade',
    valor: 'R$ 29,90',
    status: 'pending'
  }
]

const RowOptions = () => {
  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='mdi:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={handleRowOptionsClose}>
          <Icon icon='mdi:email' fontSize={20} />
          Enviar Mensagem
        </MenuItem>
        <MenuItem sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:check' fontSize={20} />
          Pagamento Manual
        </MenuItem>
        <MenuItem sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:reload' fontSize={20} />
          Fatura Mensalidade
        </MenuItem>
      </Menu>
    </>
  )
}

const userStatusObj: any = {
  active: {
    text: 'Confirmado',
    color: 'success'
  },
  pending: {
    text: 'Pendente',
    color: 'warning'
  }
}

const FaturasCliente = () => {
  const { copy, target } = useClipboard({
    onSuccess: () => {
      toast.success('ID do Pagamento copiado!')
    },
    onError: () => {
      toast.error('Erro ao copiar ID do Pagamento')
    }
  })

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
      flex: 0.105,
      minWidth: 100,
      field: 'tipoFatura',
      headerName: 'Tipo de Fatura'
    },
    {
      flex: 0.05,
      minWidth: 100,
      field: 'valor',
      headerName: 'Valor'
    },
    {
      flex: 0.0875,
      minWidth: 100,
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
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Ações',
      renderCell: () => <RowOptions />
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <CustomDataGrid
              columns={columns}
              rows={rows}
              onCellClick={params => {
                if (params.field !== 'idPagamento' && params.field !== 'actions') {
                  alert('VISUALIZAR FATURA')
                }
              }}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default FaturasCliente
