// ** React Imports
import { useState, useCallback, useEffect } from 'react'

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
import CustomDataGrid from 'src/components/CustomDataGrid/CustomDataGrid'
import { useRouter } from 'next/router'
import { maskCnpj, maskCpf } from 'src/utils/masks/masks'
import axios from 'axios'
import { Avatar, Box } from '@mui/material'
import { getInitials } from 'src/@core/utils/get-initials'

const columns: GridColDef[] = [
  {
    flex: 0.1,
    minWidth: 200,
    field: 'name',
    headerName: 'Cliente',
    renderCell: ({ row }: any) => {
      return (
        <Box display='flex' alignItems='center' gap={4}>
          {row.avatar === '' ? (
            <Avatar sx={{ color: '#fff', bgcolor: theme => theme.palette.primary.main }}>
              {getInitials(row.name)}
            </Avatar>
          ) : (
            <Avatar src={row.avatar} />
          )}
          <p>{row.name}</p>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 200,
    field: 'cpf',
    headerName: 'CPF / CNPJ',
    renderCell: ({ row }: any) => {
      const { cpf } = row

      return <p>{row.tipoCliente === 'pf' ? maskCpf(cpf) : maskCnpj(cpf)}</p>
    }
  },
  {
    flex: 0.1,
    field: 'iccid',
    minWidth: 200,
    headerName: 'ICCID'
  },
  {
    flex: 0.1,
    minWidth: 200,
    field: 'msisdn',
    headerName: 'MSISDN'
  }
]

const Clientes = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios.get('/users/list').then(response => setUsers(response.data))
  }, [])
  console.log(users)

  // ** State
  const [role, setRole] = useState<string>('')
  const [plan, setPlan] = useState<string>('')

  const handleRoleChange = useCallback((e: SelectChangeEvent) => {
    setRole(e.target.value)
  }, [])

  const handlePlanChange = useCallback((e: SelectChangeEvent) => {
    setPlan(e.target.value)
  }, [])

  // ** Função de filtro
  const filterFunction = useCallback(
    (row: any) => {
      const matchesTipoCliente = role === '' || row.tipoCliente === role
      const matchesTipoDeLinha = plan === '' || row.tipoDeLinha === plan

      return matchesTipoCliente && matchesTipoDeLinha
    },
    [role, plan]
  )

  const router = useRouter()

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
              <Grid item sm={6} xs={12}>
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
                    <MenuItem value=''>Todos</MenuItem>
                    <MenuItem value='pf'>Pessoa Física</MenuItem>
                    <MenuItem value='pj'>Pessoa Jurídica</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
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
                    <MenuItem value=''>Todos</MenuItem>
                    <MenuItem value='prepago'>Pré-Pago</MenuItem>
                    <MenuItem value='pospago'>Pós-Pago</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />

          <CustomDataGrid
            columns={columns}
            rows={users}
            filterFunction={filterFunction}
            onCellClick={e => router.push(`clientes/detalhes/${e.row.cpf}`)}
            placeholderSearch='Buscar Cliente'
            titleButton='Novo Cliente'
          />
        </Card>
      </Grid>
    </Grid>
  )
}

Clientes.acl = {
  action: 'read',
  subject: 'parceiros'
}

export default Clientes
