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
import { Alert, AlertTitle, FormHelperText } from '@mui/material'
import { useEffect } from 'react'
import { maskCpf } from 'src/utils/masks/masks'

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
const SchemaFormAtivarLinha = z.object({
  mvno: z.string().min(1, 'MVNO é obrigatório'),
  cpf: z.string().min(1, 'CPF é obrigatório'),
  iccid: z.string().min(1, 'ICCID é obrigatório'),
  ddd: z.string().min(1, 'DDD é obrigatório'),
  planos: z.string().min(1, 'Planos é obrigatório')
})

type AtivarLinhaFormData = z.infer<typeof SchemaFormAtivarLinha>

const AtivarLinhaDrawer = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle } = props

  // ** Hooks
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<AtivarLinhaFormData>({
    resolver: zodResolver(SchemaFormAtivarLinha)
  })

  // ** Submit Form Add Cliente
  async function handleSubmitAddClientDrawer(data: AtivarLinhaFormData) {
    await new Promise(resolve => setTimeout(resolve, 2000))

    handleClose()

    console.log(data)
  }

  const handleClose = () => {
    toggle()
  }

  // ** Máscaras
  const cpfValue = watch('cpf')

  useEffect(() => {
    setValue('cpf', maskCpf(cpfValue))
  }, [cpfValue, setValue])

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
        <Typography variant='h6'>Ativar Linha</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>

      <Box sx={{ p: 5 }}>
        <Alert icon={false} severity='info' sx={{ mb: 6 }}>
          <AlertTitle sx={{ fontWeight: 600, mb: theme => `${theme.spacing(1)} !important` }}>
            ICCID é o número do código de barras do chip.
          </AlertTitle>
          <Typography
            variant='subtitle2'
            fontWeight={400}
            sx={{
              color: theme => (theme.palette.mode === 'dark' ? theme.palette.info.light : theme.palette.info.dark)
            }}
          >
            Geralmente iniciado por 8955.
          </Typography>
        </Alert>

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
            <TextField
              label='CPF*'
              placeholder='000.000.000-00'
              {...register('cpf')}
              error={!!errors.cpf}
              helperText={errors.cpf?.message}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              label='ICCID*'
              placeholder='89558955000000000000000'
              {...register('iccid')}
              error={!!errors.iccid}
              helperText={errors.iccid?.message}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='ddd-select'>DDD</InputLabel>
            <Select
              fullWidth
              id='select-ddd'
              label='DDD'
              labelId='ddd-select'
              {...register('ddd')}
              error={!!errors.ddd}
            >
              <MenuItem value='11'>11</MenuItem>
              <MenuItem value='12'>12</MenuItem>
              <MenuItem value='13'>13</MenuItem>
              <MenuItem value='14'>14</MenuItem>
              <MenuItem value='15'>15</MenuItem>
              <MenuItem value='16'>16</MenuItem>
              <MenuItem value='17'>17</MenuItem>
              <MenuItem value='18'>18</MenuItem>
              <MenuItem value='19'>19</MenuItem>
              <MenuItem value='21'>21</MenuItem>
            </Select>
            {!!errors.ddd && (
              <FormHelperText sx={{ color: theme => theme.palette.error.main }}>{errors.ddd.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='planos-select'>Planos</InputLabel>
            <Select
              fullWidth
              id='select-planos'
              label='Planos'
              labelId='planos-select'
              {...register('planos')}
              error={!!errors.planos}
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
            {!!errors.planos && (
              <FormHelperText sx={{ color: theme => theme.palette.error.main }}>{errors.planos.message}</FormHelperText>
            )}
          </FormControl>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }} disabled={isSubmitting}>
              {isSubmitting ? 'Ativando...' : 'Ativar'}
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

export default AtivarLinhaDrawer
