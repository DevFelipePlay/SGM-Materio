// ** React Imports
import { useState, useCallback } from 'react'

// ** Next Imports

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridColDef, gridClasses } from '@mui/x-data-grid'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Third Party Components

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'

const columns: GridColDef[] = [
  {
    flex: 0.1,
    minWidth: 100,
    field: 'name',
    headerName: 'Nome'
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'cpf',
    headerName: 'CPF'
  },
  {
    flex: 0.1,
    field: 'iccid',
    minWidth: 100,
    headerName: 'ICCID'
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'msisdn',
    headerName: 'MSISDN'
  }
]

const rows = [
  {
    id: 1,
    name: 'Adam Sandler',
    cpf: '050.018.691-84',
    iccid: '8955170110333028510',
    msisdn: '(61) 92004-6246'
  },
  {
    id: 2,
    name: 'João Pedro',
    cpf: '080.070.691-94',
    iccid: '8955170110333028510',
    msisdn: '(61) 92004-6246'
  },
  {
    id: 3,
    name: 'João Pedro',
    cpf: '080.070.691-94',
    iccid: '8955170110333028510',
    msisdn: '(61) 92004-6246'
  },
  {
    id: 4,
    name: 'João Pedro',
    cpf: '080.070.691-94',
    iccid: '8955170110333028510',
    msisdn: '(61) 92004-6246'
  },
  {
    id: 5,
    name: 'João Pedro',
    cpf: '080.070.691-94',
    iccid: '8955170110333028510',
    msisdn: '(61) 92004-6246'
  },
  {
    id: 6,
    name: 'João Pedro',
    cpf: '080.070.691-94',
    iccid: '8955170110333028510',
    msisdn: '(61) 92004-6246'
  },
  {
    id: 7,
    name: 'João Pedro',
    cpf: '080.070.691-94',
    iccid: '8955170110333028510',
    msisdn: '(61) 92004-6246'
  },
  {
    id: 8,
    name: 'João Pedro',
    cpf: '080.070.691-94',
    iccid: '8955170110333028510',
    msisdn: '(61) 92004-6246'
  },
  {
    id: 9,
    name: 'João Pedro',
    cpf: '080.070.691-94',
    iccid: '8955170110333028510',
    msisdn: '(61) 92004-6246'
  },
  {
    id: 10,
    name: 'João Pedro',
    cpf: '080.070.691-94',
    iccid: '8955170110333028510',
    msisdn: '(61) 92004-6246'
  },
  {
    id: 11,
    name: 'João Pedro',
    cpf: '080.070.691-94',
    iccid: '8955170110333028510',
    msisdn: '(61) 92004-6246'
  },
  {
    id: 12,
    name: 'João Pedro',
    cpf: '080.070.691-94',
    iccid: '8955170110333028510',
    msisdn: '(61) 92004-6246'
  },
  {
    id: 13,
    name: 'João Pedro',
    cpf: '080.070.691-94',
    iccid: '8955170110333028510',
    msisdn: '(61) 92004-6246'
  }
]

const Clientes = () => {
  // ** State
  const [role, setRole] = useState<string>('')
  const [plan, setPlan] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleRoleChange = useCallback((e: SelectChangeEvent) => {
    setRole(e.target.value)
  }, [])

  const handlePlanChange = useCallback((e: SelectChangeEvent) => {
    setPlan(e.target.value)
  }, [])

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={3} sm={6}>
            <CardStatisticsHorizontal
              color='info'
              stats='4500'
              trend='positive'
              trendNumber='10.2%'
              title='Clientes'
              icon={<Icon color='secondary' icon='mdi:account-multiple' />}
            />
          </Grid>

          <Grid item xs={12} md={3} sm={6}>
            <CardStatisticsHorizontal
              color='info'
              stats='1000'
              trend='positive'
              trendNumber='5%'
              title='Novos Clientes'
              icon={<Icon color='secondary' icon='mdi:account-multiple' />}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ p: 6 }}>
          <CardHeader title='Filtrar' />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='tipo-client-select'>Tipo de Cliente</InputLabel>
                  <Select
                    fullWidth
                    value={role}
                    id='tipo-client-select'
                    label='Tipo de Cliente'
                    labelId='tipo-client-select'
                    onChange={handleRoleChange}
                    inputProps={{ placeholder: 'Selecione o Tipo de Cliente' }}
                  >
                    <MenuItem value='pf'>Pessoa Física</MenuItem>
                    <MenuItem value='pj'>Pessoa Jurídica</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='tipo-linha-select'>Tipo de Linha</InputLabel>
                  <Select
                    fullWidth
                    value={plan}
                    id='tipo-linha-select'
                    label='Tipo de Linha'
                    labelId='tipo-linha-select'
                    onChange={handlePlanChange}
                    inputProps={{ placeholder: 'Selecione o Tipo de Cliente' }}
                  >
                    <MenuItem value='prepago'>Pré-Pago</MenuItem>
                    <MenuItem value='pospago'>Pós-Pago</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Status</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='select-status'
                    label='Status'
                    labelId='status-select'
                    onChange={handleStatusChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value='ativo'>Ativo</MenuItem>
                    <MenuItem value='grace1'>Grace 1</MenuItem>
                    <MenuItem value='grace2'>Grace 2</MenuItem>
                    <MenuItem value='grace3'>Grace 3</MenuItem>
                    <MenuItem value='ex'>Ex</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <TableHeader
            value={value}
            handleFilter={handleFilter}
            toggle={toggleAddUserDrawer}
            placeholderSearch='Buscar Cliente'
            titleButton='Novo Cliente'
          />
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            getRowSpacing={params => ({
              top: params.isFirstVisible ? 10 : 5,
              bottom: params.isLastVisible ? 10 : 5
            })}
            sx={{
              [`& .${gridClasses.row}`]: {
                bgcolor: theme => (theme.palette.mode === 'light' ? '#f1f1f1' : '#404040'),
                borderRadius: '8px'
              },
              [`& .${gridClasses.cell}`]: {
                padding: '16px',
                border: 'none'
              },
              [`& .${gridClasses.columnHeader}`]: {
                border: 'none'
              }
            }}
          />
        </Card>
      </Grid>

      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} titleButton='Cadastrar Novo Parceiro' />
    </Grid>
  )
}

Clientes.acl = {
  action: 'read',
  subject: 'parceiros'
}

export default Clientes
