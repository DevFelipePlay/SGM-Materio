// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
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

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteUser } from 'src/store/apps/user'

// ** Third Party Components

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Custom Table Components Imports
import CadastroMVNO from 'src/components/CadastroMVNO'
import CustomDataGrid from 'src/components/CustomDataGrid/CustomDataGrid'

interface UserRoleType {
  [key: string]: { icon: string; color: string }
}

interface UserStatusType {
  [key: string]: ThemeColor
}

// ** Vars
const userRoleObj: UserRoleType = {
  admin: { icon: 'mdi:laptop', color: 'error.main' },
  author: { icon: 'mdi:cog-outline', color: 'warning.main' },
  editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
  maintainer: { icon: 'mdi:chart-donut', color: 'success.main' },
  subscriber: { icon: 'mdi:account-outline', color: 'primary.main' }
}

interface CellType {
  row: UsersType
}

const userStatusObj: UserStatusType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
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

// ** renders client column
const renderClient = (row: UsersType) => {
  if (row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 30, height: 30 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}
      >
        {getInitials(row.fullName ? row.fullName : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const RowOptions = ({ id }: { id: number | string }) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteUser(id))
    handleRowOptionsClose()
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
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          onClick={handleRowOptionsClose}
          href='/apps/user/view/overview/'
        >
          <Icon icon='mdi:eye-outline' fontSize={20} />
          View
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:delete-outline' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const columns: GridColDef[] = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'fullName',
    headerName: 'Parceiro',
    renderCell: ({ row }: CellType) => {
      const { fullName, username } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <LinkStyled href='/apps/user/view/overview/'>{fullName}</LinkStyled>
            <Typography noWrap variant='caption'>
              {`@${username}`}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'id',
    headerName: 'ID'
  },

  {
    flex: 0.15,
    minWidth: 120,
    headerName: 'CNPJ',
    field: 'currentPlan',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ textTransform: 'capitalize' }}>
          {row.currentPlan}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          skin='light'
          size='small'
          label={row.status}
          color={userStatusObj[row.status]}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  }
]

const UserList = () => {
  // ** State
  const [role, setRole] = useState<string>('')
  const [plan, setPlan] = useState<string>('')
  const [status, setStatus] = useState<string>('')

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(
      fetchData({
        role,
        status,
        q: '',
        currentPlan: plan
      })
    )
  }, [dispatch, plan, role, status])

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

          {/* <DataGrid
            autoHeight
            rows={store.data}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          /> */}
          <CustomDataGrid
            columns={columns}
            rows={store.data}
            filterFunction={filterFunction}
            toggle={() => toggleAddUserDrawer()}
          />
        </Card>
      </Grid>

<<<<<<< HEAD
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
=======
      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
>>>>>>> 176cc88 (drawer de adicionar cliente)
    </Grid>
  )
}

UserList.acl = {
  action: 'read',
  subject: 'parceiros'
}

export default UserList
