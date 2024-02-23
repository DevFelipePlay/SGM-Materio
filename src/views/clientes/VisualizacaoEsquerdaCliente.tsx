// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
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
import LinearProgress from '@mui/material/LinearProgress'
import DialogContentText from '@mui/material/DialogContentText'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import UserSuspendDialog from 'src/views/apps/user/view/UserSuspendDialog'
import UserSubscriptionDialog from 'src/views/apps/user/view/UserSubscriptionDialog'

// ** Types
import { UsersType } from 'src/types/apps/userTypes'

// ** Utils Import
import { Avatar, CardHeader, IconButton, Tooltip } from '@mui/material'
import { maskCelular, maskCep, maskCnpj, maskCpf } from 'src/utils/masks/masks'
import toast from 'react-hot-toast'
import { getInitials } from 'src/@core/utils/get-initials'
import CriarContaFaturaDialog from './ContaFaturaDialogs/CriarContaFaturaDialog'
import EditarContaFaturaDialog from './ContaFaturaDialogs/EditarContaFaturaDialog'
import VisualizarContaFaturaDialog from './ContaFaturaDialogs/VisualizarContaFaturaDialog'
import { Icon } from '@iconify/react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'

interface DadosClienteProps {
  cpf: string
  name: string
  avatar: string
  email: string
  birthdate: string
  cellphone: string
  whatsapp: string
  cep: string
  uf: string
  city: string
  district: string
  street: string
  number: string
  pospago: boolean
  msisdn: string
  plandescription: string
  planvalue: string
  complement?: string
  rgie?: string
  contafatura?: string
}

interface VisualizacaoEsquerdaClienteProps {
  userData: DadosClienteProps
}

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
  left: '-1.125rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')({
  fontWeight: 300,
  fontSize: '1rem',
  alignSelf: 'flex-end'
})

// ** Zod
const SchemaEditDadosClientForm = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  cpf: z.string().min(1, 'CPF é obrigatório'),
  rgie: z.string(),
  nascimento: z.string().min(1, 'Data de Nascimento é obrigatório'),
  email: z.string().email('Email é obrigatório'),
  phone: z.string().min(1, 'Celular é obrigatório'),
  whats: z.string().min(1, 'WhatsApp é obrigatório'),
  cep: z.string().min(1, 'CEP é obrigatório'),
  uf: z.string().min(1, 'UF é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatório'),
  bairro: z.string().min(1, 'Bairro é obrigatório'),
  logradouro: z.string().min(1, 'Logradouro é obrigatório'),
  number: z.string().min(1, 'Número é obrigatório'),
  complemento: z.string()
})

type EditDadosClienteFormData = z.infer<typeof SchemaEditDadosClientForm>

const VisualizacaoEsquerdaCliente = ({ userData }: VisualizacaoEsquerdaClienteProps) => {
  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openPlans, setOpenPlans] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)
  const [criarContaFaturaDialogOpen, setCriarContaFaturaDialogOpen] = useState<boolean>(false)
  const [editarContaFaturaDialogOpen, setEditarContaFaturaDialogOpen] = useState<boolean>(false)
  const [visualizarContaFaturaDialogOpen, setVisualizarContaFaturaDialogOpen] = useState<boolean>(false)

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  // Handle Altera Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)
  const handleAlteraPlano = () => {
    handlePlansClose()
    toast.success('Alteração feita com sucesso!')
  }

  // ** Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors }
  } = useForm<EditDadosClienteFormData>({
    resolver: zodResolver(SchemaEditDadosClientForm),
    defaultValues: {
      bairro: userData.district,
      cep: userData.cep,
      cidade: userData.city,
      cpf: userData.cpf,
      complemento: userData.complement ? userData.complement : '',
      email: userData.email,
      logradouro: userData.street,
      nascimento: userData.birthdate ? format(new Date(userData.birthdate), 'dd/MM/yyyy') : '',
      nome: userData.name,
      number: userData.number,
      phone: userData.cellphone,
      rgie: userData.rgie ? userData.rgie : '',
      uf: userData.uf,
      whats: userData.whatsapp
    }
  })

  // ** Máscaração
  const cpfValue = watch('cpf')
  const phoneValue = watch('phone')
  const whatsAppValue = watch('whats')
  const cepValue = watch('cep')

  useEffect(() => {
    setValue('cpf', maskCpf(cpfValue))
    setValue('phone', maskCelular(phoneValue))
    setValue('whats', maskCelular(whatsAppValue))
    setValue('cep', maskCep(cepValue))
  }, [setValue, cpfValue, phoneValue, whatsAppValue, cepValue])

  // Enviar form

  async function handleSubmitEditDadosCliente(data: EditDadosClienteFormData) {
    await new Promise(resolve => setTimeout(resolve, 2000))

    handleEditClose()
    toast.success('Dados editados com sucesso!')

    console.log(data)
  }

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 10, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {userData.avatar === '' ? (
                <Avatar
                  sx={{
                    color: '#fff',
                    bgcolor: theme => theme.palette.primary.main,
                    width: '7rem',
                    height: '7rem',
                    fontSize: '2rem'
                  }}
                >
                  {getInitials(userData.name)}
                </Avatar>
              ) : (
                <Avatar sx={{ width: '7rem', height: '7rem' }} src={userData.avatar} />
              )}
              {/* <Avatar src={userData.avatar} sx={{ width: '7rem', height: '7rem' }} /> */}
              <Typography variant='h6' sx={{ mb: 2, mt: 3, textAlign: 'center' }}>
                {userData.name}
              </Typography>
            </CardContent>

            <CardContent>
              <Typography variant='h6'>Dados Pessoais</Typography>
              <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
              <Box sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>
                    {userData && userData.cpf && userData.cpf.length === 14 ? 'CNPJ:' : 'CPF:'}
                  </Typography>
                  <Typography variant='body2'>
                    {userData && userData.cpf && userData.cpf.length === 14
                      ? maskCnpj(userData.cpf)
                      : maskCpf(userData.cpf)}
                  </Typography>
                </Box>
                {userData.rgie && (
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>RG:</Typography>
                    <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                      {userData.rgie}
                    </Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Data de Nascimento:</Typography>
                  <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                    {userData.birthdate && format(new Date(userData.birthdate), 'dd/MM/yyyy')}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Email:</Typography>
                  <Typography variant='body2'>{userData.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Celular:</Typography>
                  <Typography variant='body2'>{maskCelular(userData.cellphone)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>WhatsApp:</Typography>
                  <Typography variant='body2'>{maskCelular(userData.whatsapp)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>CEP:</Typography>
                  <Typography variant='body2'>{maskCep(userData.cep)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>UF:</Typography>
                  <Typography variant='body2'>{userData.uf}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Cidade:</Typography>
                  <Typography variant='body2'>{userData.city}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Bairro:</Typography>
                  <Typography variant='body2'>{userData.district}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>
                    Endereço:
                    <Typography variant='body2' display='inline'>{`  ${userData.street} ${userData.number} ${
                      userData.complement ? userData.complement : ''
                    }`}</Typography>
                  </Typography>
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
                Editar Dados do Cliente
              </DialogTitle>
              <DialogContent
                sx={{
                  pb: theme => `${theme.spacing(8)} !important`,
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
                }}
              >
                <form>
                  <Grid container spacing={6} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='Nome*'
                        {...register('nome')}
                        error={!!errors.nome}
                        helperText={errors.nome?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='CPF*'
                        placeholder='000.000.000-00'
                        {...register('cpf')}
                        error={!!errors.cpf}
                        helperText={errors.cpf?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={'RG'}
                        {...register('rgie')}
                        error={!!errors.rgie}
                        helperText={errors.rgie?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={'Data Nascimento*'}
                        placeholder='dd/mm/yyyy'
                        {...register('nascimento')}
                        error={!!errors.nascimento}
                        helperText={errors.nascimento?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Email*'
                        placeholder='seu@email.com'
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Celular*'
                        placeholder='(00) 0 0000-0000'
                        {...register('phone')}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='WhatsApp*'
                        placeholder='(00) 0 0000-0000'
                        InputProps={{
                          endAdornment: <Icon icon='mdi:whatsapp' color='#56CA00' fontSize={24} />
                        }}
                        {...register('whats')}
                        error={!!errors.whats}
                        helperText={errors.whats?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='CEP*'
                        placeholder='00000-000'
                        {...register('cep')}
                        error={!!errors.cep}
                        helperText={errors.cep?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='UF*'
                        placeholder='Ex: DF'
                        {...register('uf')}
                        error={!!errors.uf}
                        helperText={errors.uf?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Cidade*'
                        placeholder='Ex: Brasília'
                        {...register('cidade')}
                        error={!!errors.cidade}
                        helperText={errors.cidade?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Bairro*'
                        placeholder='Ex: Parque São José'
                        {...register('bairro')}
                        error={!!errors.bairro}
                        helperText={errors.bairro?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Logradouro*'
                        placeholder='Ex: Viela 16'
                        {...register('logradouro')}
                        error={!!errors.logradouro}
                        helperText={errors.logradouro?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Número*'
                        placeholder='Ex: 123'
                        {...register('number')}
                        error={!!errors.number}
                        helperText={errors.number?.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='Complemento*'
                        placeholder='Ex: Sobrado verde ao lado da sorveteria...'
                        {...register('complemento')}
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
                <Button
                  variant='contained'
                  sx={{ mr: 2 }}
                  type='submit'
                  onClick={handleSubmit(handleSubmitEditDadosCliente)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                  Cancelar
                </Button>
              </DialogActions>
            </Dialog>

            <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
            <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
          </Card>
        </Grid>

        {userData.pospago && (
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title={
                  <Box display='flex' alignItems='center' gap={2}>
                    <Typography variant='h6'>Conta Fatura</Typography>
                    <Tooltip
                      title='A rotina de geração de fatura é executada todos os dias às 14:00h, após este horário novas alterações entrarão em vigor no próximo dia.
'
                    >
                      <Icon icon='mdi:information-outline' />
                    </Tooltip>
                  </Box>
                }
              />
              <Divider sx={{ width: '90%', mx: 'auto' }} />
              <CardContent>
                <Box sx={{ pb: 1 }}>
                  <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>MSISDN:</Typography>
                    <Typography variant='body2'>{maskCelular(userData.msisdn)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Nome da Linha:</Typography>
                    <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                      -
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Conta Fatura:</Typography>
                    <Typography variant='body2'>{userData.contafatura}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Total de Linhas:</Typography>
                    <Box display='flex' alignItems='center' gap={1}>
                      <Typography variant='body2'>2</Typography>
                      <Tooltip title='Visualizar'>
                        <IconButton
                          sx={{ alignSelf: 'start' }}
                          onClick={() => setVisualizarContaFaturaDialogOpen(true)}
                        >
                          <Icon icon='mdi:eye' fontSize={16} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3 }}>
                <Button variant='contained' onClick={() => setCriarContaFaturaDialogOpen(true)} sx={{ flex: 1 }}>
                  Criar
                </Button>
                <Button variant='outlined' onClick={() => setEditarContaFaturaDialogOpen(true)} sx={{ flex: 1 }}>
                  Editar
                </Button>
              </CardActions>

              <CriarContaFaturaDialog open={criarContaFaturaDialogOpen} setOpen={setCriarContaFaturaDialogOpen} />
              <EditarContaFaturaDialog open={editarContaFaturaDialogOpen} setOpen={setEditarContaFaturaDialogOpen} />
              <VisualizarContaFaturaDialog
                open={visualizarContaFaturaDialogOpen}
                setOpen={setVisualizarContaFaturaDialogOpen}
              />
            </Card>
          </Grid>
        )}

        <Grid item xs={12}>
          <Card sx={{ boxShadow: 'none', border: theme => `2px solid ${theme.palette.primary.main}` }}>
            <CardContent
              sx={{ display: 'flex', flexWrap: 'wrap', pb: '0 !important', justifyContent: 'center', gap: 2 }}
            >
              <CustomChip skin='light' size='small' color='primary' label={userData.plandescription} />
              <Box
                sx={{
                  display: 'flex',
                  position: 'relative',
                  gap: 1
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
                  {userData.planvalue && userData.planvalue.replace('.', ',')}
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
                  pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
                  mb: -4
                }}
              >
                Alterar Plano
              </DialogTitle>

              <DialogContent
                sx={{ px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`] }}
              >
                <DialogContentText variant='body2' sx={{ textAlign: 'center' }} id='user-view-plans-description'>
                  Escolha o melhor plano para o usuário.
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
                  <InputLabel id='user-view-plans-select-label'>Escolha o Plano</InputLabel>
                  <Select
                    label='Escolha o Plano'
                    defaultValue='6gb'
                    id='user-view-plans-select'
                    labelId='user-view-plans-select-label'
                  >
                    <MenuItem value='6gb'>PLAY 6Gb + 100 Minutos + 60 sms - R$29,90/mês</MenuItem>
                    <MenuItem value='8gb'>
                      PLAY 8Gb + Minutos Ilimitados + 100 sms + 1 Gb Portabilidade - R$34,90/mês
                    </MenuItem>
                    <MenuItem value='14gb'>
                      PLAY 14Gb + Minutos Ilimitados + 100 sms + 1 Gb Portabilidade - R$39,90/mês
                    </MenuItem>
                    <MenuItem value='21gb'>
                      PLAY 21Gb + Minutos Ilimitados + 100 sms + 1 Gb Portabilidade - R$49,90/mês
                    </MenuItem>
                  </Select>
                </FormControl>
                <Button variant='contained' sx={{ minWidth: ['100%', 0] }} onClick={handleAlteraPlano}>
                  ALTERAR
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
                <Typography
                  sx={{ fontWeight: 500, mb: 2, fontSize: '0.875rem', wordBreak: 'break-word', maxWidth: '400px' }}
                >
                  O plano atual do usuário é:
                  <Typography variant='inherit' fontWeight={700} sx={{ color: theme => theme.palette.primary.main }}>
                    {userData.plandescription}
                  </Typography>
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
                    <Sup>R$</Sup>
                    <Typography
                      variant='h5'
                      sx={{
                        mb: -1.2,
                        lineHeight: 1,
                        color: 'primary.main',
                        fontSize: '3rem !important'
                      }}
                    >
                      29,90
                    </Typography>
                    <Sub>/ mês</Sub>
                  </Box>
                  <Button color='error' variant='outlined' sx={{ mt: 2 }} onClick={handlePlansClose}>
                    Voltar
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

export default VisualizacaoEsquerdaCliente
