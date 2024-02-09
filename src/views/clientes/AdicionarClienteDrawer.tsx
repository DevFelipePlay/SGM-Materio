// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import * as z from 'zod'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormHelperText } from '@mui/material'
import { useEffect } from 'react'
import { maskCelular, maskCep, maskCpf } from 'src/utils/masks/masks'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

// ** Zod
const SchemaFormAddClienteDrawer = z.object({
  mvno: z.string().min(1, 'MVNO é obrigatória'),
  nome: z.string().min(1, 'Nome é obrigatório'),
  cpf: z.string().min(1, 'CPF é obrigatório'),
  rg: z.string().min(1, 'RG é obrigatório'),
  dataNascimento: z.string().min(1, 'Data de Nascimento é obrigatória'),
  email: z.string().email('Email é obrigatório'),
  celular: z.string().min(1, 'Celular é obrigatório'),
  whatsApp: z.string().min(1, 'WhatsApp é obrigatório'),
  cep: z.string().min(1, 'CEP é obrigatório'),
  uf: z.string().min(1, 'UF é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatório'),
  bairro: z.string().min(1, 'Bairro é obrigatório'),
  logradouro: z.string().min(1, 'Logradouro é obrigatório'),
  numeroEndereco: z.string().min(1, 'Número é obrigatório'),
  complemento: z.string()
})

type AddClientDataProps = z.infer<typeof SchemaFormAddClienteDrawer>

const AdicionarClienteDrawer = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle } = props

  // ** Hooks
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<AddClientDataProps>({
    resolver: zodResolver(SchemaFormAddClienteDrawer)
  })

  // ** Submit Form Add Cliente
  function handleSubmitAddClientDrawer(data: AddClientDataProps) {
    console.log(data)
  }

  const handleClose = () => {
    toggle()
  }

  // ** Máscaras
  const cpfValue = watch('cpf')
  const celularValue = watch('celular')
  const whatsappValue = watch('whatsApp')
  const cepValue = watch('cep')

  useEffect(() => {
    setValue('cpf', maskCpf(cpfValue))
    setValue('celular', maskCelular(celularValue))
    setValue('whatsApp', maskCelular(whatsappValue))
    setValue('cep', maskCep(cepValue))
  }, [cpfValue, celularValue, whatsappValue, cepValue, setValue])

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 500 } } }}
    >
      <Header>
        <Typography variant='h6'>Adicionar Cliente</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(handleSubmitAddClientDrawer)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='mvno-select'>MVNO</InputLabel>
            <Select
              fullWidth
              id='select-mvno'
              label='MVNO'
              labelId='mvno-select'
              {...register('mvno')}
              error={!!errors.mvno}
            >
              <MenuItem value='playmovel'>PLAY MÓVEL</MenuItem>
              <MenuItem value='iconnext'>ICONNEXT</MenuItem>
              <MenuItem value='tegg'>TEGG</MenuItem>
              <MenuItem value='opuscell'>OPUSCELL</MenuItem>
              <MenuItem value='bwtelecom'>BW TELECOM</MenuItem>
            </Select>
            {!!errors.mvno && (
              <FormHelperText sx={{ color: theme => theme.palette.error.main }}>{errors.mvno.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField label='Nome*' {...register('nome')} error={!!errors.nome} helperText={errors.nome?.message} />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              label='CPF*'
              placeholder='000.000.000-00'
              {...register('cpf')}
              error={!!errors.cpf}
              helperText={errors.cpf?.message}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField label='RG*' {...register('rg')} error={!!errors.rg} helperText={errors.rg?.message} />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              label='Data de Nascimento*'
              placeholder='dd/mm/yyyy'
              {...register('dataNascimento')}
              error={!!errors.dataNascimento}
              helperText={errors.dataNascimento?.message}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              type='email'
              label='Email*'
              placeholder='seu@email.com'
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              label='Celular*'
              placeholder='(00) 0 0000-0000'
              {...register('celular')}
              error={!!errors.celular}
              helperText={errors.celular?.message}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              label='WhatsApp*'
              placeholder='(00) 0 0000-0000'
              {...register('whatsApp')}
              error={!!errors.whatsApp}
              helperText={errors.whatsApp?.message}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              label='CEP*'
              placeholder='00000-000'
              {...register('cep')}
              error={!!errors.cep}
              helperText={errors.cep?.message}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              label='UF*'
              placeholder='Ex: DF'
              {...register('uf')}
              error={!!errors.uf}
              helperText={errors.uf?.message}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              label='Cidade*'
              placeholder='Ex: Brasília'
              {...register('cidade')}
              error={!!errors.cidade}
              helperText={errors.cidade?.message}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              label='Bairro*'
              placeholder='Ex: Parque São José'
              {...register('bairro')}
              error={!!errors.bairro}
              helperText={errors.bairro?.message}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              label='Logradouro*'
              placeholder='Ex: Viela 16'
              {...register('logradouro')}
              error={!!errors.logradouro}
              helperText={errors.logradouro?.message}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              label='Número*'
              placeholder='Ex: 123'
              {...register('numeroEndereco')}
              error={!!errors.numeroEndereco}
              helperText={errors.numeroEndereco?.message}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              label='Complemento'
              placeholder='Ex: Sobrado verde ao lado da sorveteria...'
              {...register('complemento')}
            />
          </FormControl>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Adicionar
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancelar
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default AdicionarClienteDrawer
