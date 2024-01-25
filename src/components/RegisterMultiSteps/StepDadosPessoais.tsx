// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'
import { TextField } from '@mui/material'

// ** Utils
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { maskCelular, maskCep, maskCnpj, maskCpf, maskNascimento } from 'src/utils/masks/masks'
import { unmask } from 'remask'
import apiCep from 'src/services/apiCep'
import toast from 'react-hot-toast'

// Schema Zod
const SchemaFormCadastroUsuario = z.object({
  cpf: z.string().min(1, 'CPF é obrigatório'),
  cnpjParceiro: z.string().min(1, 'CNPJ é obrigatório'),
  email: z.string().email('Email é obrigatório'),
  phone: z.string().min(1, 'Celular é obrigatório'),
  whats: z.string().min(1, 'WhatsApp é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  cep: z.string().min(1, 'CEP é obrigatório'),
  uf: z.string().min(1, 'UF é obrigatório'),
  rgie: z.string(),
  nascimento: z.string().min(1, 'Data de Nascimento é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatório'),
  district: z.string().min(1, 'Bairro é obrigatório'),
  street: z.string().min(1, 'Endereço'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string()
})

// Tipagem automática de acordo com o Schema do Zod
type FormCadastroUsuario = z.infer<typeof SchemaFormCadastroUsuario>

const StepDadosPessoais = ({ handlePrev }: { handlePrev: () => void }) => {
  // React Hook Form
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<FormCadastroUsuario>({
    resolver: zodResolver(SchemaFormCadastroUsuario)
  })

  function handleSubmitCadastroUsuario(data: any) {
    console.log(data)
  }

  // Máscaras
  const cpfValue = watch('cpf')
  const cnpjParceiroValue = watch('cnpjParceiro')
  const nascimentoValue = watch('nascimento')
  const phoneValue = watch('phone')
  const whatsAppValue = watch('whats')
  const cepValue = watch('cep')

  useEffect(() => {
    setValue('cpf', maskCpf(cpfValue))
    setValue('cnpjParceiro', maskCnpj(cnpjParceiroValue))
    setValue('nascimento', maskNascimento(nascimentoValue))
    setValue('phone', maskCelular(phoneValue))
    setValue('whats', maskCelular(whatsAppValue))
    setValue('cep', maskCep(cepValue))
  }, [setValue, cpfValue, cnpjParceiroValue, nascimentoValue, phoneValue, whatsAppValue, cepValue])

  // Buscar CEP

  async function getCepInfo() {
    const formatedCep = unmask(cepValue)
    try {
      const data = (await apiCep.get('/' + formatedCep + '/json')).data
      setValue('uf', data.uf)
      setValue('cidade', data.localidade)
      setValue('district', data.bairro)
      setValue('street', data.logradouro)
    } catch (error: any) {
      toast.error('Cep Inválido')
    }
  }

  useEffect(() => {
    if (cepValue && unmask(cepValue).length >= 8) {
      getCepInfo()
    }
  }, [cepValue])

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h5'>Cadastre seus Dados</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Insira suas informações pessoais</Typography>
      </Box>

      <Grid component='form' container spacing={5} onSubmit={handleSubmit(handleSubmitCadastroUsuario)}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Nome*'
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            placeholder='000.000.000-00'
            label='CPF*'
            {...register('cpf')}
            error={!!errors.cpf}
            helperText={errors.cpf?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            placeholder='00.000.000/0000-00'
            label='CNPJ*'
            {...register('cnpjParceiro')}
            error={!!errors.cnpjParceiro}
            helperText={errors.cnpjParceiro?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='RG'
            {...register('rgie')}
            error={!!errors.rgie}
            helperText={errors.rgie?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            placeholder='dd/mm/yyyy'
            label='Data de Nascimento*'
            {...register('nascimento')}
            error={!!errors.nascimento}
            helperText={errors.nascimento?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder='seu@email.com'
            label='Email*'
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
            placeholder='(00) 0000-0000'
            {...register('whats')}
            error={!!errors.whats}
            helperText={errors.whats?.message}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='CEP*'
            placeholder='00000-000'
            {...register('cep')}
            error={!!errors.cep}
            helperText={errors.cep?.message}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Controller
            name='uf'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='UF*'
                placeholder='Ex: DF'
                error={!!errors.uf}
                helperText={errors.uf?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Controller
            name='cidade'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Cidade*'
                placeholder='Ex: Brasília'
                error={!!errors.uf}
                helperText={errors.uf?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Controller
            name='district'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Bairro*'
                placeholder=''
                error={!!errors.district}
                helperText={errors.district?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Controller
            name='street'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Logradouro*'
                placeholder='Ex: Viela 16'
                error={!!errors.street}
                helperText={errors.street?.message}
                autoComplete='off'
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='Número*'
            placeholder='Ex: 123'
            {...register('number')}
            error={!!errors.number}
            helperText={errors.number?.message}
            type='number'
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Complemento'
            placeholder='Ex: Sobrado verde ao lado da sorveteria'
            {...register('complement')}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              color='secondary'
              variant='contained'
              onClick={handlePrev}
              startIcon={<Icon icon='mdi:chevron-left' fontSize={20} />}
            >
              Voltar
            </Button>
            <Button color='success' variant='contained' type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default StepDadosPessoais
