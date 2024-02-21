// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { GridColDef } from '@mui/x-data-grid'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Importação de Componentes
import CustomAvatar from 'src/@core/components/mui/avatar'
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Importação de Utilidades
import { getInitials } from 'src/@core/utils/get-initials'

// ** Importação de tipos

// ** Custom Table Components Imports
import CadastroMVNO from 'src/components/CadastroMVNO'
import CustomDataGrid from 'src/components/CustomDataGrid/CustomDataGrid'
import { useRouter } from 'next/router'
import axios from 'axios'
import { PartnersTypes } from 'src/types/apps/PartnersTypes'
import { maskCnpj } from 'src/utils/masks/masks'

interface CellType {
  row: PartnersTypes
}

const LinkStyled = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

// ** Avatar com logo do parceiro
const renderClient = (row: PartnersTypes) => {
  if (row.logotipo.length) {
    return <CustomAvatar src={row.logotipo} sx={{ mr: 3, width: 30, height: 30 }} />
  } else {
    return (
      <CustomAvatar skin='light' color={'primary'} sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}>
        {getInitials(row.companyname ? row.companyname : 'John Doe')}
      </CustomAvatar>
    )
  }
}

// eslint-disable-next-line react-hooks/rules-of-hooks

export const columns: GridColDef[] = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'companyname',
    headerName: 'Parceiro',
    renderCell: ({ row }: CellType) => {
      const { companyname, tradename } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <LinkStyled href='/apps/user/view/overview/'>{companyname}</LinkStyled>
            <Typography noWrap variant='caption'>
              {`@${tradename}`}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'companyid',
    headerName: 'ID'
  },

  {
    flex: 0.15,
    minWidth: 120,
    headerName: 'CNPJ',
    field: 'cnpj',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ textTransform: 'capitalize' }}>
          {maskCnpj(row.cnpj)}
        </Typography>
      )
    }
  }

  // {
  //   flex: 0.1,
  //   minWidth: 110,
  //   field: 'status',
  //   headerName: 'Status',
  //   renderCell: ({ row }: CellType) => {
  //     return (
  //       <CustomChip
  //         skin='light'
  //         size='small'
  //         label={row.}
  //         color={userStatusObj[row.status]}
  //         sx={{ textTransform: 'capitalize' }}
  //       />
  //     )
  //   }
  // }
]

const UserList = () => {
  // ** State
  const [role, setRole] = useState<string>('')
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)
  const [plan, setPlan] = useState<string>('')
  const [status, setStatus] = useState<string>('')

  // ** Hooks

  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    axios.get('/parceiros/list').then(response => {
      setPartners(response.data)
      setLoading(false)
      console.log(response.data)
    })
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

  //Dialog

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const toggleAddUserDrawer = () => handleClickOpen()

  const filterFunction = useCallback(
    (row: any) => {
      const matchRole = plan === '' || row.plan === plan

      return matchRole
    },
    [plan]
  )

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={3} sm={6}>
            <CardStatisticsHorizontal
              color='info'
              stats='4500'
              trend='negative'
              trendNumber='10.2%'
              title='Parceiros'
              icon={<Icon color='secondary' icon='mdi:account-outline' />}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={6}>
            <CardStatisticsHorizontal
              color='error'
              stats='95'
              trend='positive'
              trendNumber='10.2%'
              title='Franquias'
              icon={<Icon color='secondary' icon='mdi:trending-up' />}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={6}>
            <CardStatisticsHorizontal
              color='error'
              stats='95'
              trend='positive'
              trendNumber='10.2%'
              title='Franquias'
              icon={<Icon color='secondary' icon='mdi:trending-up' />}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={6}>
            <CardStatisticsHorizontal
              color='error'
              stats='95'
              trend='positive'
              trendNumber='10.2%'
              title='Franquias'
              icon={<Icon color='secondary' icon='mdi:trending-up' />}
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
                  <InputLabel id='role-select'>Consultor</InputLabel>
                  <Select
                    fullWidth
                    value={role}
                    id='select-role'
                    label='Select Role'
                    labelId='role-select'
                    onChange={handleRoleChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value='mt'>Mateuzin Mil grau</MenuItem>
                    <MenuItem value='Leandro'>Leandro</MenuItem>
                    <MenuItem value='admin'>Toredo</MenuItem>
                    <MenuItem value='author'>Avô</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>Parceiro</InputLabel>
                  <Select
                    fullWidth
                    value={plan}
                    id='select-plan'
                    label='Select Plan'
                    labelId='plan-select'
                    onChange={handlePlanChange}
                    inputProps={{ placeholder: 'Select Plan' }}
                  >
                    <MenuItem value='parceiro'>MVNO</MenuItem>
                    <MenuItem value='franquia'>Franquia</MenuItem>
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
                    label='Select Status'
                    labelId='status-select'
                    onChange={handleStatusChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value=''>INADINPLANTE</MenuItem>
                    <MenuItem value='pending'>ATIVO</MenuItem>
                    <MenuItem value='active'>CANCELADO</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />

          <CustomDataGrid
            columns={columns}
            rows={partners}
            loading={loading}
            onCellClick={e => router.push(`parceiros/teste/${e.row.id}`)}
            filterFunction={filterFunction}
            toggle={() => toggleAddUserDrawer()}
          />
        </Card>
      </Grid>

      <>
        <Dialog
          open={open}
          maxWidth={'xl'}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogContent>
            <CadastroMVNO />
          </DialogContent>
        </Dialog>
      </>
    </Grid>
  )
}

UserList.acl = {
  action: 'read',
  subject: 'parceiros'
}

export default UserList
