// ** MUI Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { maskCelular } from 'src/utils/masks/masks'
import * as z from 'zod'

// ** Schema Zod
const SchemaAdicionarProtocoloClienteForm = z.object({
  telefoneCliente: z.string().min(1, 'Telefone do Cliente é obrigatório'),
  mvno: z.string().min(1, 'MVNO é obrigatório'),
  servico: z.string().min(1, 'Serviço é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatório'),
  tipoProtocolo: z.enum(['auvo', 'surf']),
  codigo: z.string().min(1, 'é obrigatório'),
  link: z.string().min(1, 'é obrigatório')
})

type AdicionarProtocoloClienteFormData = z.infer<typeof SchemaAdicionarProtocoloClienteForm>

const AdicionarProtocoloCliente = () => {
  // ** Hooks
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors }
  } = useForm<AdicionarProtocoloClienteFormData>({
    resolver: zodResolver(SchemaAdicionarProtocoloClienteForm)
  })

  const tipoProtocolo = watch('tipoProtocolo')

  // Máscaras
  const telefoneClienteValue = watch('telefoneCliente')

  useEffect(() => {
    setValue('telefoneCliente', maskCelular(telefoneClienteValue))
  }, [telefoneClienteValue, setValue])

  // ** Submit Form Protocolo
  function handleSubmitProtocoloForm(data: AdicionarProtocoloClienteFormData) {
    console.log(data)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <Box display='flex' alignItems='center' gap={2}>
                <Typography variant='h6'>Adicionar Protocolo Manual</Typography>
                <Tooltip
                  title='Para selecionar o serviço é preciso digitar o telefone do cliente.
'
                >
                  <Icon cursor='pointer' icon='mdi:information-outline' fontSize={18} />
                </Tooltip>
              </Box>
            }
          />
          <CardContent>
            <form onSubmit={handleSubmit(handleSubmitProtocoloForm)}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size='medium' error={!!errors.telefoneCliente}>
                    <InputLabel htmlFor='telefone-cliente'>Telefone Cliente*</InputLabel>
                    <OutlinedInput
                      label='Telefone Cliente*'
                      id='telefone-cliente'
                      placeholder='(00) 0 0000-0000'
                      {...register('telefoneCliente')}
                    />
                    {!!errors.telefoneCliente && (
                      <FormHelperText sx={{ color: theme => theme.palette.error.main }}>
                        {errors.telefoneCliente.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.mvno}>
                    <InputLabel id='mvno-select'>MVNO*</InputLabel>
                    <Select
                      fullWidth
                      id='mvno-select'
                      label='MVNO*'
                      labelId='mvno-select'
                      inputProps={{ placeholder: 'Selecione o Tipo de Cliente' }}
                      {...register('mvno')}
                    >
                      <MenuItem value='playmovel'>PLAY MÓVEL</MenuItem>
                      <MenuItem value='tegg'>TEGG</MenuItem>
                      <MenuItem value='infotec'>INFOTEC</MenuItem>
                      <MenuItem value='infotec'>INFOTEC</MenuItem>
                      <MenuItem value='opuscell'>OPUSCELL</MenuItem>
                      <MenuItem value='plus'>PLUS</MenuItem>
                      <MenuItem value='seuchip'>SEUCHIP</MenuItem>
                      <MenuItem value='skymovel'>SKYMOVEL</MenuItem>
                      <MenuItem value='sucesso'>SUCESSO</MenuItem>
                      <MenuItem value='sumtel'>SUMTEL</MenuItem>
                      <MenuItem value='uaisat'>UAI SAT</MenuItem>
                      <MenuItem value='ubernetmovel'>UBERNET MÓVEL</MenuItem>
                      <MenuItem value='wipi'>WIPI</MenuItem>
                      <MenuItem value='agil'>AGIL</MenuItem>
                    </Select>
                    {!!errors.mvno && (
                      <FormHelperText sx={{ color: theme => theme.palette.error.main }}>
                        {errors.mvno.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth error={!!errors.servico}>
                    <InputLabel id='servico-select'>Serviço*</InputLabel>
                    <Select
                      fullWidth
                      id='servico-select'
                      label='Serviço*'
                      labelId='servico-select'
                      inputProps={{ placeholder: 'Selecione o Tipo de Cliente' }}
                      {...register('servico')}
                    >
                      <MenuItem value='ajusteBeneficio'>AJUSTE DE BENEFICIOS (DADOS, VOZ E SMS)</MenuItem>
                      <MenuItem value='ATIVAÇÃO DE CHIP'>ATIVAÇÃO DE CHIP</MenuItem>
                      <MenuItem value='BLOQUEIO/DESBLOQUEIO DE CHIP'>BLOQUEIO/DESBLOQUEIO DE CHIP</MenuItem>
                      <MenuItem value='ERRO DE PORTABILIDADE'>ERRO DE PORTABILIDADE</MenuItem>
                      <MenuItem value='TROCA DE CHIP'>TROCA DE CHIP</MenuItem>
                    </Select>
                    {!!errors.servico && (
                      <FormHelperText sx={{ color: theme => theme.palette.error.main }}>
                        {errors.servico.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name='descricao'
                      control={control}
                      defaultValue=''
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            multiline
                            id='descricao'
                            label='Descrição*'
                            error={!!errors.descricao}
                            helperText={errors.descricao?.message}
                          />
                        )
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography fontSize='1.125rem' fontWeight={500} sx={{ mb: 2 }}>
                    Tipo Protocolo
                  </Typography>
                  <FormControl sx={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                    <RadioGroup defaultValue='surf' row aria-label='type-protocol-radio' {...register('tipoProtocolo')}>
                      <FormControlLabel value='surf' control={<Radio />} label='Surf' />
                      <FormControlLabel value='auvo' control={<Radio />} label='Auvo' />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size='medium' error={!!errors.codigo}>
                    <InputLabel htmlFor={tipoProtocolo === 'surf' ? 'numero-spec' : 'numero-auvo'}>
                      {tipoProtocolo === 'surf' ? 'Número Spec*' : 'Número Ticket*'}
                    </InputLabel>
                    <OutlinedInput
                      label={tipoProtocolo === 'surf' ? 'Número Spec*' : 'Número Ticket*'}
                      id={tipoProtocolo === 'surf' ? 'numero-spec' : 'numero-auvo'}
                      placeholder={tipoProtocolo === 'surf' ? 'Número do Spec da Surf' : 'Número do Ticket do Auvo'}
                      {...register('codigo')}
                    />
                    {!!errors.codigo && (
                      <FormHelperText sx={{ color: theme => theme.palette.error.main }}>
                        {tipoProtocolo === 'surf' ? 'Número Spec' : 'Número Ticket'} {errors.codigo.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size='medium' error={!!errors.link}>
                    <InputLabel htmlFor={tipoProtocolo === 'surf' ? 'link-surf' : 'link-auvo'}>
                      {tipoProtocolo === 'surf' ? 'Link Surf*' : 'Link Auvo*'}
                    </InputLabel>
                    <OutlinedInput
                      label={tipoProtocolo === 'surf' ? 'Link Surf*' : 'Link Auvo*'}
                      id={`${tipoProtocolo === 'surf' ? 'link-surf' : 'link-auvo'}`}
                      placeholder={tipoProtocolo === 'surf' ? 'Link do Spec da Surf' : 'Link do Ticket do Auvo'}
                      {...register('link')}
                    />
                    {!!errors.link && (
                      <FormHelperText sx={{ color: theme => theme.palette.error.main }}>
                        {tipoProtocolo === 'surf' ? 'Link Surf' : 'Link Auvo'} {errors.link.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button type='submit' variant='contained'>
                    Adicionar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AdicionarProtocoloCliente
