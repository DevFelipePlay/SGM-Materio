// ** MUI Imports
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiTextField, { TextFieldProps } from '@mui/material/TextField'
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Box, CircularProgress, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { maskCnpj, maskCpf } from 'src/utils/masks/masks'

interface SearchICCIDFormData {
  iccid: string
}

interface SearchedUserICCID {
  iccid: string
  operadora: string
  msisdn: string
  name: string
  cpf: string
  plano: string
}

// Styled Card component
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  border: 0,
  boxShadow: 'none',
  backgroundSize: 'cover',
  backgroundImage: `url(/images/pages/tree-cone-cube-bg-${theme.palette.mode}.png)`
}))

// Styled TextField component
const TextField = styled(MuiTextField)<TextFieldProps>(({ theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper
  },
  [theme.breakpoints.up('sm')]: {
    width: '55%'
  }
}))

const ConsultarICCID = () => {
  // ** Hook Form
  const { register, watch, handleSubmit } = useForm<SearchICCIDFormData>({
    defaultValues: {
      iccid: ''
    }
  })

  const iccidValue = watch('iccid')

  // ** State
  const [searchedICCID, setSearchedICCID] = useState<string>('')
  const [searchedUser, setSearchedUser] = useState<SearchedUserICCID | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  // ** Functions

  async function getUserByICCID(iccid: string) {
    setLoading(true)
    try {
      const response = await (await axios.get('/api/consultaiccid', { params: { iccid } })).data

      setSearchedUser(response)
      setLoading(false)
    } catch (error) {
      console.error(error)
      toast.error('Usuário não encontrado')
      setLoading(false)
    }
  }

  const handleSubmitSearchICCID = useCallback((data: SearchICCIDFormData) => {
    setSearchedICCID(data.iccid)
    getUserByICCID(data.iccid)
  }, [])

  // ** Use Effect

  useEffect(() => {
    if (iccidValue.length === 19) handleSubmit(handleSubmitSearchICCID)()
  }, [iccidValue, handleSubmitSearchICCID, handleSubmit])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pt: 23, textAlign: 'center', pb: theme => `${theme.spacing(23)} !important` }}>
            <Typography variant='h5' sx={{ mb: 1, fontWeight: 600, color: 'primary.main' }}>
              Consulta de ICCID
            </Typography>
            <Typography variant='body2' sx={{ mb: 6.5 }}>
              Verifique as informações sobre o ICCID
            </Typography>
            <TextField
              placeholder='Pesquise um ICCID...'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Icon icon='mdi:magnify' />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    {loading && <CircularProgress sx={{ mr: 1 }} size={25} color='primary' />}
                  </InputAdornment>
                )
              }}
              {...register('iccid')}
            />
          </CardContent>
        </Card>
      </Grid>
      {searchedUser && searchedICCID && (
        <>
          <Grid item xs={12} sm={6}>
            <CustomCardOverview
              color='primary'
              stats={searchedUser?.iccid}
              title='ICCID'
              icon={<Icon color='secondary' icon='mdi:barcode-scan' />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomCardOverview
              color='primary'
              stats={searchedUser?.operadora}
              title='MVNO'
              icon={<Icon color='secondary' icon='mdi:web' />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomCardOverview
              color='primary'
              stats={searchedUser?.msisdn}
              title='MSISDN'
              icon={<Icon color='secondary' icon='mdi:phone' />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomCardOverview
              color='primary'
              stats={searchedUser?.name}
              title='Cliente'
              icon={<Icon color='secondary' icon='mdi:account-circle' />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomCardOverview
              color='primary'
              stats={searchedUser.cpf.length === 14 ? maskCnpj(searchedUser?.cpf) : maskCpf(searchedUser?.cpf)}
              title='CPF/CNPJ'
              icon={<Icon color='secondary' icon='mdi:card-account-details' />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomCardOverview
              color='primary'
              stats={searchedUser?.plano}
              title='Plano'
              icon={<Icon color='secondary' icon='bi:collection-fill' />}
            />
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default ConsultarICCID

const CustomCardOverview = (props: any) => {
  // ** Styled Avatar component
  const Avatar = styled(MuiAvatar)<AvatarProps>(({ theme }) => ({
    width: 44,
    height: 44,
    boxShadow: theme.shadows[2],
    marginRight: theme.spacing(2.75),
    backgroundColor: theme.palette.background.default,
    '& svg': {
      fontSize: '1.5rem'
    }
  }))

  // ** Props
  const { title, icon, stats, color = 'primary' } = props

  return (
    <Card
      sx={{
        boxShadow: theme => `${theme.shadows[6]} !important`,
        backgroundImage: 'none'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar variant='rounded' sx={{ color: `${color}.main` }}>
            {icon}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>{title}</Typography>
            <Box sx={{ mt: 0.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography sx={{ mr: 1, fontSize: '1rem', fontWeight: 600, lineHeight: 1.05 }}>{stats}</Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              ></Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
