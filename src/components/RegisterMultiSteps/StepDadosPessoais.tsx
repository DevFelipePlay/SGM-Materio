// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'
import { Avatar, Divider, TextField } from '@mui/material'

// ** Utils
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useEffect, useState } from 'react'
import { maskCelular, maskCep, maskCnpj, maskCpf, maskNascimento } from 'src/utils/masks/masks'
import { unmask } from 'remask'
import apiCep from 'src/services/apiCep'
import toast from 'react-hot-toast'
import { CustomRadioIconsData } from 'src/@core/components/custom-radio/types'
import CustomRadioIcons from 'src/@core/components/custom-radio/icons'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import FileUploaderRestrictions from '../Components/FileUploader/FileUploaderRestrictions'

// Schema Zod
const SchemaFormCadastroUsuario = z.object({
  cpf: z.string().min(14, 'CPF é obrigatório'),
  cnpjParceiro: z.string().min(18, 'CNPJ é obrigatório'),
  email: z.string().email('Email é obrigatório'),
  phone: z.string().min(16, 'Celular é obrigatório'),
  whats: z.string().min(16, 'WhatsApp é obrigatório'),
  name: z.string().min(3, 'Nome é obrigatório'),
  cep: z.string().min(9, 'CEP é obrigatório'),
  uf: z.string().min(2, 'UF é obrigatório'),
  rgie: z.string(),
  nascimento: z.string().min(1, 'Data de Nascimento é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatório'),
  district: z.string().min(1, 'Bairro é obrigatório'),
  street: z.string().min(1, 'Logradouro é obrigatório'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string(),
  avatar: z.any()
})

// Tipagem automática de acordo com o Schema do Zod
type FormCadastroUsuario = z.infer<typeof SchemaFormCadastroUsuario>

const StepDadosPessoais = ({ handlePrev }: { handlePrev: () => void }) => {
  // States
  const [isSubmittingCEP, setIsSubmittingCEP] = useState<boolean>(false)

  // React Hook Form
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting }
  } = useForm<FormCadastroUsuario>({
    resolver: zodResolver(SchemaFormCadastroUsuario)
  })

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
    setIsSubmittingCEP(true)

    try {
      const data = (await apiCep.get('/' + formatedCep + '/json')).data

      // Caso retorne como undefined os campos
      if (!data || !data.localidade || !data.logradouro || !data.bairro) return

      setValue('uf', data.uf)
      setValue('cidade', data.localidade)
      setValue('district', data.bairro)
      setValue('street', data.logradouro)
      trigger(['uf', 'cidade', 'district', 'street'])
    } catch (error: any) {
      toast.error('CEP Inválido')
    } finally {
      setIsSubmittingCEP(false)
    }
  }

  useEffect(() => {
    if (cepValue && unmask(cepValue).length >= 8) {
      getCepInfo()
    }
  }, [cepValue])

  // Avatares

  const data: CustomRadioIconsData[] = [
    {
      value: 'sem_avatar',
      title: <Typography variant='h5'>Sem Avatar</Typography>,
      content: (
        <Box sx={{ my: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Avatar sx={{ width: '3rem', height: '3rem', my: 3 }}>JP</Avatar>
        </Box>
      )
    },
    {
      isSelected: true,
      value: 'avatar_padrao',
      title: <Typography variant='h5'>Avatar Padrão</Typography>,
      content: (
        <Box sx={{ my: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Avatar src='/images/avatars/1.png' sx={{ width: '3rem', height: '3rem', my: 3 }} />
        </Box>
      )
    },
    {
      value: 'sua_foto',
      title: <Typography variant='h5'>Sua Foto</Typography>,
      content: (
        <Box sx={{ my: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Icon icon='mdi:camera' cursor='pointer' fontSize={42} />
        </Box>
      )
    }
  ]

  const handleRadioChange = (prop: string | ChangeEvent<HTMLInputElement>) => {
    if (typeof prop === 'string') {
      setSelectedRadio(prop)
      setActiveAvatarType(prop)
    } else {
      setSelectedRadio((prop.target as HTMLInputElement).value)
    }
  }

  const initialSelected: string = data.filter(item => item.isSelected)[data.filter(item => item.isSelected).length - 1]
    .value

  const [selectedRadio, setSelectedRadio] = useState<string>(initialSelected)

  const [activeAvatarType, setActiveAvatarType] = useState<string>('avatar_padrao')

  // Avatares Padrão

  const avataresPadroes: CustomRadioIconsData[] = [
    {
      isSelected: true,
      value: 'avatar_1',
      content: (
        <Box sx={{ my: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Avatar src='/images/avatars/1.png' sx={{ width: '5rem', height: '5rem', my: 3 }} />
        </Box>
      )
    },
    {
      value: 'avatar_2',
      content: (
        <Box sx={{ my: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Avatar src='/images/avatars/2.png' sx={{ width: '5rem', height: '5rem', my: 3 }} />
        </Box>
      )
    },
    {
      value: 'avatar_3',
      content: (
        <Box sx={{ my: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Avatar src='/images/avatars/3.png' sx={{ width: '5rem', height: '5rem', my: 3 }} />
        </Box>
      )
    },
    {
      value: 'avatar_4',
      content: (
        <Box sx={{ my: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Avatar src='/images/avatars/4.png' sx={{ width: '5rem', height: '5rem', my: 3 }} />
        </Box>
      )
    },
    {
      value: 'avatar_5',
      content: (
        <Box sx={{ my: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Avatar src='/images/avatars/5.png' sx={{ width: '5rem', height: '5rem', my: 3 }} />
        </Box>
      )
    },
    {
      value: 'avatar_6',
      content: (
        <Box sx={{ my: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Avatar src='/images/avatars/6.png' sx={{ width: '5rem', height: '5rem', my: 3 }} />
        </Box>
      )
    },
    {
      value: 'avatar_7',
      content: (
        <Box sx={{ my: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Avatar src='/images/avatars/7.png' sx={{ width: '5rem', height: '5rem', my: 3 }} />
        </Box>
      )
    },
    {
      value: 'avatar_8',
      content: (
        <Box sx={{ my: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Avatar src='/images/avatars/8.png' sx={{ width: '5rem', height: '5rem', my: 3 }} />
        </Box>
      )
    }
  ]

  const initialAvatarSelected: string = avataresPadroes.filter(item => item.isSelected)[
    avataresPadroes.filter(item => item.isSelected).length - 1
  ].value

  const [selectedAvatar, setSelectedAvatar] = useState<string>(initialAvatarSelected)

  const handleAvatarChange = (prop: string | ChangeEvent<HTMLInputElement>) => {
    if (typeof prop === 'string') {
      setSelectedAvatar(prop)
    } else {
      setSelectedAvatar((prop.target as HTMLInputElement).value)
    }
  }

  // Sua Foto

  // Definir qual tipo de avatar vai ser exibido em tela

  const getAvatarTypeContent = (avatarType: string) => {
    switch (avatarType) {
      case 'sem_avatar':
        return null
      case 'avatar_padrao':
        return avataresPadroes.map((item, index) => (
          <CustomRadioIcons
            key={index}
            data={avataresPadroes[index]}
            selected={selectedAvatar}
            name='custom-radios-plan'
            gridProps={{ sm: 4, xs: 12 }}
            handleChange={handleAvatarChange}
          />
        ))
      case 'sua_foto':
        return (
          <Grid item xs={12}>
            <DropzoneWrapper width={'100%'}>
              <FileUploaderRestrictions nameInput='avatar' control={control} />
            </DropzoneWrapper>
          </Grid>
        )
      default:
        return null
    }
  }

  const renderContent = () => {
    return getAvatarTypeContent(activeAvatarType)
  }

  // Enviar formulário pro endpoint

  function handleSubmitCadastroUsuario(data: FormCadastroUsuario) {
    const {
      cep,
      cidade,
      cnpjParceiro,
      complement,
      cpf,
      district,
      email,
      name,
      nascimento,
      number,
      phone,
      rgie,
      street,
      uf,
      whats,
      avatar
    } = data

    const payload = {
      cep,
      cidade,
      cnpjParceiro,
      complement,
      cpf,
      district,
      email,
      name,
      nascimento,
      number,
      phone,
      rgie,
      street,
      uf,
      whats,
      avatar: selectedRadio === 'sem_avatar' ? '' : selectedRadio === 'avatar_padrao' ? selectedAvatar : avatar
    }

    console.log(payload)
  }

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
            InputProps={{
              endAdornment: <Icon icon='mdi:whatsapp' color='#48C657' cursor='pointer' />
            }}
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
                disabled={isSubmittingCEP}
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
                error={!!errors.cidade}
                helperText={errors.cidade?.message}
                disabled={isSubmittingCEP}
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
                disabled={isSubmittingCEP}
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
                disabled={isSubmittingCEP}
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
          <Typography variant='h5'>Selecione seu Avatar</Typography>
        </Grid>

        {data.map((item, index) => (
          <CustomRadioIcons
            key={index}
            data={data[index]}
            selected={selectedRadio}
            name='custom-radios-plan'
            gridProps={{ sm: 4, xs: 12 }}
            handleChange={handleRadioChange}
          />
        ))}

        {selectedRadio === 'avatar_padrao' && (
          <Grid item xs={12} textAlign='center'>
            <Divider />
          </Grid>
        )}

        {selectedRadio === 'avatar_padrao' && (
          <Grid item xs={12}>
            <Typography variant='h6'>Escolha um Avatar Padrão</Typography>
          </Grid>
        )}

        {renderContent()}

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
