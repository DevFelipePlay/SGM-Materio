import { useState, useEffect, useCallback } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'

import Select, { SelectChangeEvent } from '@mui/material/Select'
import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Icon from 'src/@core/components/icon'
import { useDispatch } from 'react-redux'
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'
import { fetchData } from 'src/store/apps/user'
import { AppDispatch } from 'src/store'
import TableHeader from 'src/views/apps/user/list/TableHeader'
import CadastrarNovoParceiro from 'src/pages/cadastrar-novo-parceiro'

// import { columns } from '.'

export const UserList = () => {
  // ** State
  const [role, setRole] = useState<string>('')
  const [plan, setPlan] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')

  // const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  // const store = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(
      fetchData({
        role,
        status,
        q: value,
        currentPlan: plan
      })
    )
  }, [dispatch, plan, role, status, value])

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

  //Dialog
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const toggleAddUserDrawer = () => setOpen(true)

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
        <Card>
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
          <TableHeader
            value={value}
            handleFilter={handleFilter}
            toggle={toggleAddUserDrawer}
            placeholderSearch='Buscar Parceiro'
            titleButton='Novo Parceiro'
          />
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
        </Card>
      </Grid>

      <>
        <Button variant='outlined' onClick={handleClickOpen}>
          Open alert dialog
        </Button>
        <Dialog
          open={open}
          maxWidth={'xl'}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogContent>
            <CadastrarNovoParceiro />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </Grid>
  )
}

export default UserList
