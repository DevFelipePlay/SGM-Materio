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
import { GridColDef } from '@mui/x-data-grid'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Third Party Components

// ** Custom Table Components Imports
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import CustomDataGrid from 'src/components/CustomDataGrid/CustomDataGrid'

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
    headerName: 'CPF / CNPJ'
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
    cpf: '33.093.462/0001-50',
    iccid: '8955170110333029997',
    msisdn: '(61) 92002-8084',
    tipoCliente: 'cnpj',
    tipoDeLinha: 'pospago'
  },
  {
    id: 2,
    name: 'João Pedro',
    cpf: '080.070.691-94',
    iccid: '8955170110333028510',
    msisdn: '(61) 92004-6246',
    tipoCliente: 'cpf',
    tipoDeLinha: 'prepago'
  },
  {
    id: 3,
    name: 'Daniel',
    cpf: '840.168.642-82',
    iccid: '8955170110319855035',
    msisdn: '(61) 92002-9499',
    tipoCliente: 'cpf',
    tipoDeLinha: 'prepago'
  },
  {
    id: 4,
    name: 'Leandro',
    cpf: '552.842.231-81',
    iccid: '8955170110333025532',
    msisdn: '(61) 92003-1586',
    tipoCliente: 'cpf',
    tipoDeLinha: 'prepago'
  },
  {
    id: 5,
    name: 'Marcelo',
    cpf: '561.876.464-13',
    iccid: '8955170110333025995',
    msisdn: '(61) 92003-3758',
    tipoCliente: 'cpf',
    tipoDeLinha: 'prepago'
  },
  {
    id: 6,
    name: 'Eder',
    cpf: '495.424.264-45',
    iccid: '8955170110333027306',
    msisdn: '(61) 92003-4430',
    tipoCliente: 'cpf',
    tipoDeLinha: 'prepago'
  },
  {
    id: 7,
    name: 'Pedro',
    cpf: '457.485.568-32',
    iccid: '8955170110333029062',
    msisdn: '(61) 92004-2693',
    tipoCliente: 'cpf',
    tipoDeLinha: 'prepago'
  },
  {
    id: 8,
    name: 'Renato',
    cpf: '587.456.867-15',
    iccid: '8955170110333030086',
    msisdn: '(61) 92004-6246',
    tipoCliente: 'cpf',
    tipoDeLinha: 'prepago'
  },
  {
    id: 9,
    name: 'Felipe',
    cpf: '565.154.847-14',
    iccid: '8955170110114549551',
    msisdn: '(61) 92004-3512',
    tipoCliente: 'cpf',
    tipoDeLinha: 'prepago'
  },
  {
    id: 10,
    name: 'Mateus',
    cpf: '653.466.534-18',
    iccid: '8955170110114511429',
    msisdn: '(61) 92004-6246',
    tipoCliente: 'cpf',
    tipoDeLinha: 'prepago'
  }
]

const Clientes = () => {
  // ** State
  const [role, setRole] = useState<string>('')
  const [plan, setPlan] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)

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
        <Card sx={{ px: 4 }}>
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

          <CustomDataGrid columns={columns} rows={rows} />
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
