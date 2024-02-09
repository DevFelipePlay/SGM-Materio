// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CustomDataGrid from 'src/components/CustomDataGrid/CustomDataGrid'
import { GridColDef } from '@mui/x-data-grid'
import {
  CardHeader,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import useClipboard from 'src/@core/hooks/useClipboard'
import toast from 'react-hot-toast'
import { MouseEvent, forwardRef, useCallback, useState } from 'react'
import { Icon } from '@iconify/react'
import CustomChip from 'src/@core/components/mui/chip'
import DatePicker from 'react-datepicker'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import format from 'date-fns/format'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Tradução Date Picker
import { ptBR } from 'date-fns/locale'

interface PickerProps {
  start: Date | number
  end: Date | number
}

const rows = [
  {
    id: 1,
    dataGeracao: '25/12/2022',
    dataPagamento: '07/03/2023',
    idPagamento: 'pay_8360313432649612',
    tipoFatura: 'Alteração de Plano',
    valor: 'R$ 29,90',
    status: 'confirmado'
  },
  {
    id: 2,
    dataGeracao: '06/02/2024',
    dataPagamento: 'Pendente',
    idPagamento: 'pay_51gfvsz3714hksvg',
    tipoFatura: 'Mensalidade',
    valor: 'R$ 29,90',
    status: 'pendente'
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
        <MenuItem sx={{ '& svg': { mr: 2 } }}>
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
  confirmado: {
    text: 'Confirmado',
    color: 'success'
  },
  pendente: {
    text: 'Pendente',
    color: 'warning'
  }
}

const FaturasCliente = () => {
  // ** States
  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(null)
  const [status, setStatus] = useState<string>('')

  // Hooks
  const { copy, target } = useClipboard({
    onSuccess: () => {
      toast.success('ID do Pagamento copiado!')
    },
    onError: () => {
      toast.error('Erro ao copiar ID do Pagamento')
    }
  })

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }, [])

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
      headerName: 'Data de Pagamento'
    },
    {
      flex: 0.125,
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
      flex: 0.105,
      minWidth: 150,
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
      flex: 0.08,
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
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Ações',
      renderCell: () => <RowOptions />
    }
  ]

  const CustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = props.start !== null ? format(props.start, 'dd/MM/yyyy') : ''
    const endDate = props.end !== null ? ` - ${format(props.end, 'dd/MM/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return (
      <TextField
        {...props}
        fullWidth
        value={value}
        inputRef={ref}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Icon icon='mdi:calendar-range' />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <Icon icon='mdi:chevron-down' />
            </InputAdornment>
          )
        }}
      />
    )
  })

  const handleOnChange = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  // ** Função de filtro
  const filterFunction = useCallback(
    (row: any) => {
      const matchesStatusFatura = status === '' || row.status === status

      return matchesStatusFatura
    },
    [status]
  )

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{ px: 4 }}>
          <CardHeader title='Filtrar' />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-fatura-select'>Status</InputLabel>
                  <Select
                    fullWidth
                    id='status-fatura-select'
                    label='Status'
                    labelId='status-fatura-select'
                    inputProps={{ placeholder: 'Selecione o Status da Fatura' }}
                    value={status}
                    onChange={handleStatusChange}
                  >
                    <MenuItem value=''>Todos</MenuItem>
                    <MenuItem value='pendente'>Pendente</MenuItem>
                    <MenuItem value='confirmado'>Confirmado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <DatePickerWrapper>
                    <DatePicker
                      selectsRange
                      endDate={endDate}
                      id='apexchart-area'
                      selected={startDate}
                      startDate={startDate}
                      onChange={handleOnChange}
                      placeholderText='Selecione uma data'
                      customInput={<CustomInput start={startDate as Date | number} end={endDate as Date | number} />}
                      locale={ptBR}
                    />
                  </DatePickerWrapper>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />

          <CustomDataGrid
            columns={columns}
            rows={rows}
            filterFunction={filterFunction}
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

export default FaturasCliente
