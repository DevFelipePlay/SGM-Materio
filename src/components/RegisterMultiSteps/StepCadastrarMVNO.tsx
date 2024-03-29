// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import FileUploaderRestrictions from '../FileUploader/FileUploaderRestrictions'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

// ** Hooks
import { IReqPostPlayCadastraParceiro } from 'src/services/CadastrarMVNO/CadastrarParceiro/IReqPostPlayCadastraParceiro'

// Utils
import { postPlayCadastraParceiro } from 'src/services/CadastrarMVNO/CadastrarParceiro/postPlayCadastraParceiro'
import toast from 'react-hot-toast'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { maskCelular, maskCep, maskCnpj, maskTelefone } from 'src/utils/masks/masks'
import { unmask } from 'remask'
import apiCep from 'src/services/apiCep'

// Schema Zod
const SchemaFormCadastroMVNO = z.object({
  companyname: z.string().min(1, 'Razão Social é obrigatório'),
  cnpj: z.string().min(18, 'CNPJ é obrigatório'),
  tradename: z.string().min(1, 'Nome da MVNO é obrigatório'),
  nomeparceiro: z.string().min(1, 'Nome Fantasia é obrigatório'),
  email: z.string().email('Email é obrigatório'),
  celular: z
    .string()
    .min(16, 'Celular é obrigatório')
    .max(16, 'Celular é obrigatório')
    .refine(value => {
      const unmaskedValue = unmask(value)

      return !['00000000000', '11111111111'].includes(unmaskedValue)
    }, 'Número inválido'),

  telefone: z.string().min(14, 'Telefone é obrigatório'),
  cep: z.string().min(9, 'CEP é obrigatório'),
  endereco: z.string().min(1, 'Endereço é obrigatório'),
  numeroendereco: z.string().min(1, 'Número é obrigatório'),
  complemento: z.string(),
  bairro: z.string().min(1, 'Bairro é obrigatório'),
  inscricaomunicipal: z.string(),
  inscricaoestadual: z.string().min(1, 'Inscrição Estadual é obrigatório'),
  consultor: z.string().min(3, 'Nome do Consultor é obrigatório'),
  logo: z.any()
})

// Tipagem automática do Zod baseado no Schema acima

type FormCadastroMVNOProps = z.infer<typeof SchemaFormCadastroMVNO>

const StepCadastrarMVNO = ({ handleNext, handlePrev }: { [key: string]: () => void }) => {
  // States
  const [isSubmittingCEP, setIsSubmittingCEP] = useState<boolean>(false)

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
    control
  } = useForm<FormCadastroMVNOProps>({
    resolver: zodResolver(SchemaFormCadastroMVNO),
    defaultValues: {
      logo: ''
    }
  })

  // Cadastrar Parceiro

  async function handleSubmitCadastroMVNO(data: FormCadastroMVNOProps) {
    const {
      bairro,
      celular,
      cep,
      cnpj,
      companyname,
      complemento,
      consultor,
      email,
      endereco,
      inscricaoestadual,
      inscricaomunicipal,
      nomeparceiro,
      numeroendereco,
      telefone,
      tradename,
      logo
    } = data

    const payload: IReqPostPlayCadastraParceiro = {
      companyname,
      cnpj: unmask(cnpj),
      tradename,
      nomeparceiro,
      email,
      celular: unmask(celular),
      telefone: unmask(telefone),
      cep: unmask(cep),
      endereco,
      numeroendereco,
      complemento,
      bairro,
      inscricaomunicipal,
      inscricaoestadual,
      consultor,
      logo: logo[0]
    }

    const dados = new FormData()
    Object.keys(payload).forEach(key => {
      dados.append(key, (payload as any)[key])
    })

    try {
      await postPlayCadastraParceiro(dados)
      toast.success('Cadastro realizado com sucesso!', {
        duration: 2000
      })
      handleNext()
    } catch (error: any) {
      console.log(error)
      toast.error(error.response.data, {
        duration: 2000
      })
    }
  }

  // Máscaras
  const cpnjValue = watch('cnpj')
  const celularValue = watch('celular')
  const telefoneValue = watch('telefone')
  const cepValue = watch('cep')

  useEffect(() => {
    setValue('cnpj', maskCnpj(cpnjValue))
    setValue('celular', maskCelular(celularValue))
    setValue('telefone', maskTelefone(telefoneValue))
    setValue('cep', maskCep(cepValue))
  }, [setValue, cpnjValue, celularValue, telefoneValue, cepValue])

  // Buscar CEP via API

  async function getCepInfo() {
    const formatedCep = unmask(cepValue)
    setIsSubmittingCEP(true)
    try {
      const data = (await apiCep.get('/' + formatedCep + '/json')).data

      // Caso retorne como undefined os campos
      if (!data || !data.localidade || !data.logradouro || !data.bairro) return

      const enderecoApi = `${data.localidade}, ${data.logradouro}`
      setValue('bairro', data.bairro)
      setValue('endereco', enderecoApi)
      trigger(['bairro', 'endereco'])
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

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h5'>Cadastre sua MVNO</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Insira os dados da sua empresa</Typography>
      </Box>

      <Grid component='form' container spacing={5} onSubmit={handleSubmit(handleSubmitCadastroMVNO)}>
        <Grid item xs={12}>
          <DropzoneWrapper width={'100%'}>
            <FileUploaderRestrictions nameInput='logo' control={control} />
          </DropzoneWrapper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            placeholder='00.000.000/0000-00'
            label='CNPJ*'
            {...register('cnpj')}
            error={!!errors.cnpj}
            helperText={errors.cnpj?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Razão Social*'
            placeholder='Razão Social como consta no CNPJ'
            {...register('companyname')}
            error={!!errors.companyname}
            helperText={errors.companyname?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            placeholder='Nome da rede no sistema'
            label='Nome da MVNO*'
            {...register('tradename')}
            error={!!errors.tradename}
            helperText={errors.tradename?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Nome Fantasia*'
            {...register('nomeparceiro')}
            error={!!errors.nomeparceiro}
            helperText={errors.nomeparceiro?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            placeholder='(00) 00000-0000'
            label='Celular*'
            {...register('celular')}
            error={!!errors.celular}
            helperText={errors.celular?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Telefone (Somente Fixo)*'
            placeholder='(00) 0000-0000'
            {...register('telefone')}
            error={!!errors.telefone}
            helperText={errors.telefone?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder='empresa@email.com'
            label='Email*'
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
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
          <Controller
            name='bairro'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Bairro*'
                placeholder=''
                error={!!errors.bairro}
                helperText={errors.bairro?.message}
                disabled={isSubmittingCEP}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name='endereco'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Endereço*'
                placeholder=''
                error={!!errors.endereco}
                helperText={errors.endereco?.message}
                disabled={isSubmittingCEP}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Número*'
            placeholder='Ex: 123'
            {...register('numeroendereco')}
            error={!!errors.numeroendereco}
            helperText={errors.numeroendereco?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Inscrição Municipal'
            placeholder='0000000000000'
            {...register('inscricaomunicipal')}
            error={!!errors.inscricaomunicipal}
            helperText={errors.inscricaomunicipal?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Inscrição Estadual*'
            placeholder='0000000000000'
            {...register('inscricaoestadual')}
            error={!!errors.inscricaoestadual}
            helperText={errors.inscricaoestadual?.message}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            label='Complemento'
            placeholder='Ex: Sobrado verde ao lado da sorveteria...'
            {...register('complemento')}
            error={!!errors.complemento}
            helperText={errors.complemento?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Nome do Consultor*'
            placeholder=''
            {...register('consultor')}
            error={!!errors.consultor}
            helperText={errors.consultor?.message}
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
            <Button
              variant='contained'
              type='submit'
              endIcon={<Icon icon='mdi:chevron-right' fontSize={20} />}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Próximo'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default StepCadastrarMVNO
