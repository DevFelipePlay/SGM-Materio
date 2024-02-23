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
import { MouseEvent, forwardRef, useCallback, useEffect, useState } from 'react'
import { Icon } from '@iconify/react'

import CustomChip from 'src/@core/components/mui/chip'
import DatePicker from 'react-datepicker'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import format from 'date-fns/format'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Tradução Date Picker
import { ptBR } from 'date-fns/locale'
import axios from 'axios'

interface FaturasProps {
  created: string
  paid: string
  paymentasaasid: string
  tipo: string
  valuetopup: string
  paymentstatus: number
}

interface PickerProps {
  start: Date | number
  end: Date | number
}

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

const statusFaturasObj: any = {
  1: {
    text: 'Confirmado',
    color: 'success'
  },
  2: {
    text: 'Pendente',
    color: 'warning'
  }
}

const FaturasCliente = ({ userData }: any) => {
  // ** States
  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(null)
  const [status, setStatus] = useState('')
  const [faturas, setFaturas] = useState<FaturasProps>()

  async function getFaturaByICCID(iccid: string) {
    try {
      const response = await (await axios.get('/api/fatura/consulta', { params: { iccid } })).data

      setFaturas(response.faturas)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    //@ts-ignore
    getFaturaByICCID(userData.iccid)
  }, [userData])

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
      field: 'created',
      headerName: 'Data de Geração',
      valueFormatter: params => format(new Date(params.value), 'dd/MM/yyyy')
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'paid',
      headerName: 'Data de Pagamento',
      valueFormatter: params => format(new Date(params.value), 'dd/MM/yyyy')
    },
    {
      flex: 0.125,
      field: 'paymentasaasid',
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
      field: 'tipo',
      headerName: 'Tipo de Fatura'
    },
    {
      flex: 0.05,
      minWidth: 100,
      field: 'valuetopup',
      headerName: 'Valor',
      valueFormatter: params => `R$ ${params.value.replace('.', ',')}`
    },
    {
      flex: 0.08,
      minWidth: 125,
      field: 'paymentstatus',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={statusFaturasObj[row.paymentstatus].text}
            color={statusFaturasObj[row.paymentstatus].color}
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
      const matchesStatusFatura = status === '' || row.paymentstatus === status

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
                    <MenuItem value={2}>Pendente</MenuItem>
                    <MenuItem value={1}>Confirmado</MenuItem>
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
            hasButton={false}
            hasExport={false}
            columns={columns}
            rows={faturas ? faturas : []}
            filterFunction={filterFunction}
            onCellClick={params => {
              if (params.field !== 'paymentasaasid' && params.field !== 'actions') {
                // window.location.href = `https://fatura.operadora.app.br/?payid=${params.row.paymentasaasid}`
                window.open(`https://fatura.operadora.app.br/?payid=${params.row.paymentasaasid}`, '_blank')
              }
            }}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default FaturasCliente
