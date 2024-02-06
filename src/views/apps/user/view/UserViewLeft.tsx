// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import UserSuspendDialog from 'src/views/apps/user/view/UserSuspendDialog'
import UserSubscriptionDialog from 'src/views/apps/user/view/UserSubscriptionDialog'

// ** Types
import { UsersType } from 'src/types/apps/userTypes'

// ** Utils Import
import { Avatar } from '@mui/material'
import { maskCpf } from 'src/utils/masks/masks'

const data: UsersType = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Daisy Patterson',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/4.png'
}

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')({
  fontWeight: 300,
  fontSize: '1rem',
  alignSelf: 'flex-end'
})

interface UserViewLeftProps {
  userData: any
}

const UserViewLeft = ({ userData }: UserViewLeftProps) => {
  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openPlans, setOpenPlans] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 10, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <Avatar src={userData.avatar} sx={{ width: '7rem', height: '7rem' }} />
              <Typography variant='h6' sx={{ mb: 2, mt: 3 }}>
                {userData.name}
              </Typography>
            </CardContent>

            <CardContent>
              <Typography variant='h6'>Dados Pessoais</Typography>
              <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
              <Box sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>CPF:</Typography>
                  <Typography variant='body2'>{maskCpf(userData.cpf)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Data de Nascimento:</Typography>
                  <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                    09/01/2001
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Email:</Typography>
                  <Typography variant='body2'>teste@teste.com</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Celular:</Typography>
                  <Typography variant='body2'>{userData.msisdn}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>WhatsApp:</Typography>
                  <Typography variant='body2'>{userData.msisdn}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>CEP:</Typography>
                  <Typography variant='body2'>72870-265</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>UF:</Typography>
                  <Typography variant='body2'>DF</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Cidade:</Typography>
                  <Typography variant='body2'>Brasília</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Bairro:</Typography>
                  <Typography variant='body2'>Riacho Fundo</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Endereço:</Typography>
                  <Typography variant='body2'>QN 8B 12 Casa 25</Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3 }}>
              <Button variant='contained' onClick={handleEditClickOpen}>
                Editar
              </Button>
              <Button color='error' variant='outlined' onClick={() => setSuspendDialogOpen(true)}>
                Excluir Linha
              </Button>
            </CardActions>

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='user-view-edit'
              aria-describedby='user-view-edit-description'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
            >
              <DialogTitle
                id='user-view-edit'
                sx={{
                  textAlign: 'center',
                  fontSize: '1.5rem !important',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                Edit User Information
              </DialogTitle>
              <DialogContent
                sx={{
                  pb: theme => `${theme.spacing(8)} !important`,
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
                }}
              >
                <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  Updating user details will receive a privacy audit.
                </DialogContentText>
                <form>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Full Name' defaultValue={data.fullName} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Username'
                        defaultValue={data.username}
                        InputProps={{ startAdornment: <InputAdornment position='start'>@</InputAdornment> }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth type='email' label='Billing Email' defaultValue={data.email} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-status-label'>Status</InputLabel>
                        <Select
                          label='Status'
                          defaultValue={data.status}
                          id='user-view-status'
                          labelId='user-view-status-label'
                        >
                          <MenuItem value='pending'>Pending</MenuItem>
                          <MenuItem value='active'>Active</MenuItem>
                          <MenuItem value='inactive'>Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='TAX ID' defaultValue='Tax-8894' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Contact' defaultValue={`+1 ${data.contact}`} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-language-label'>Language</InputLabel>
                        <Select
                          label='Language'
                          defaultValue='English'
                          id='user-view-language'
                          labelId='user-view-language-label'
                        >
                          <MenuItem value='English'>English</MenuItem>
                          <MenuItem value='Spanish'>Spanish</MenuItem>
                          <MenuItem value='Portuguese'>Portuguese</MenuItem>
                          <MenuItem value='Russian'>Russian</MenuItem>
                          <MenuItem value='French'>French</MenuItem>
                          <MenuItem value='German'>German</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-country-label'>Country</InputLabel>
                        <Select
                          label='Country'
                          defaultValue='USA'
                          id='user-view-country'
                          labelId='user-view-country-label'
                        >
                          <MenuItem value='USA'>USA</MenuItem>
                          <MenuItem value='UK'>UK</MenuItem>
                          <MenuItem value='Spain'>Spain</MenuItem>
                          <MenuItem value='Russia'>Russia</MenuItem>
                          <MenuItem value='France'>France</MenuItem>
                          <MenuItem value='Germany'>Germany</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        label='Use as a billing address?'
                        control={<Switch defaultChecked />}
                        sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                      />
                    </Grid>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions
                sx={{
                  justifyContent: 'center',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClose}>
                  Submit
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>

            <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
            <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ boxShadow: 'none', border: theme => `2px solid ${theme.palette.primary.main}` }}>
            <CardContent sx={{ display: 'flex', flexWrap: 'wrap', pb: '0 !important', justifyContent: 'center' }}>
              <CustomChip skin='light' size='small' color='primary' label='(Start) 6Gb + 100 Minutos + 60 sms' />
              <Box
                sx={{
                  display: 'flex',
                  position: 'relative'
                }}
              >
                <Typography variant='h6' sx={{ color: 'primary.main', alignSelf: 'flex-end' }}>
                  R$
                </Typography>
                <Typography
                  variant='h4'
                  sx={{
                    color: 'primary.main'
                  }}
                >
                  29,90
                </Typography>
              </Box>
            </CardContent>

            <CardContent>
              <Box sx={{ mt: 6, mb: 5 }}>
                <Box sx={{ display: 'flex', mb: 3.5, alignItems: 'center', '& svg': { mr: 2, color: 'grey.300' } }}>
                  <Icon icon='mdi:circle' fontSize='0.5rem' />
                  <Typography variant='body2'>6 GB</Typography>
                </Box>
                <Box
                  sx={{
                    mb: 3.5,
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': { mr: 2, color: 'grey.300' }
                  }}
                >
                  <Icon icon='mdi:circle' fontSize='0.5rem' />
                  <Typography variant='body2'>WhatsApp Grátis</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': { mr: 2, color: 'grey.300' }
                  }}
                >
                  <Icon icon='mdi:circle' fontSize='0.5rem' />
                  <Typography variant='body2'>100 Minutos</Typography>
                </Box>
              </Box>
              <Divider sx={{ width: '100%', mx: 'auto' }} />
              <Typography variant='h6' sx={{ color: 'text.primary', fontWeight: 600, my: 2 }}>
                Consumo
              </Typography>
              <Box sx={{ display: 'flex', mb: 1.5, justifyContent: 'space-between' }}>
                <Typography variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                  Gasto: 3GB
                </Typography>
                <Typography variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                  Total: 6GB
                </Typography>
              </Box>
              <LinearProgress value={50} variant='determinate' sx={{ height: 6, borderRadius: '5px' }} />
              <Typography variant='caption' sx={{ mt: 1.5, mb: 6, display: 'block' }}>
                3GB restantes
              </Typography>
              <Button variant='contained' sx={{ width: '100%' }} onClick={handlePlansClickOpen}>
                Alterar Plano
              </Button>
            </CardContent>

            <Dialog
              open={openPlans}
              onClose={handlePlansClose}
              aria-labelledby='user-view-plans'
              aria-describedby='user-view-plans-description'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
            >
              <DialogTitle
                id='user-view-plans'
                sx={{
                  textAlign: 'center',
                  fontSize: '1.5rem !important',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                Upgrade Plan
              </DialogTitle>

              <DialogContent
                sx={{ px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`] }}
              >
                <DialogContentText variant='body2' sx={{ textAlign: 'center' }} id='user-view-plans-description'>
                  Choose the best plan for the user.
                </DialogContentText>
              </DialogContent>

              <DialogContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: ['wrap', 'nowrap'],
                  pt: theme => `${theme.spacing(2)} !important`,
                  pb: theme => `${theme.spacing(8)} !important`,
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
                }}
              >
                <FormControl fullWidth size='small' sx={{ mr: [0, 3], mb: [3, 0] }}>
                  <InputLabel id='user-view-plans-select-label'>Choose Plan</InputLabel>
                  <Select
                    label='Choose Plan'
                    defaultValue='Standard'
                    id='user-view-plans-select'
                    labelId='user-view-plans-select-label'
                  >
                    <MenuItem value='Basic'>Basic - $0/month</MenuItem>
                    <MenuItem value='Standard'>Standard - $99/month</MenuItem>
                    <MenuItem value='Enterprise'>Enterprise - $499/month</MenuItem>
                    <MenuItem value='Company'>Company - $999/month</MenuItem>
                  </Select>
                </FormControl>
                <Button variant='contained' sx={{ minWidth: ['100%', 0] }}>
                  Upgrade
                </Button>
              </DialogContent>

              <Divider sx={{ m: '0 !important' }} />

              <DialogContent
                sx={{
                  pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(8)} !important`],
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                <Typography sx={{ fontWeight: 500, mb: 2, fontSize: '0.875rem' }}>
                  User current plan is standard plan
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: ['wrap', 'nowrap'],
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ mr: 3, display: 'flex', ml: 2.4, position: 'relative' }}>
                    <Sup>$</Sup>
                    <Typography
                      variant='h3'
                      sx={{
                        mb: -1.2,
                        lineHeight: 1,
                        color: 'primary.main',
                        fontSize: '3rem !important'
                      }}
                    >
                      99
                    </Typography>
                    <Sub>/ month</Sub>
                  </Box>
                  <Button
                    color='error'
                    variant='outlined'
                    sx={{ mt: 2 }}
                    onClick={() => setSubscriptionDialogOpen(true)}
                  >
                    Cancel Subscription
                  </Button>
                </Box>
              </DialogContent>
            </Dialog>
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft
