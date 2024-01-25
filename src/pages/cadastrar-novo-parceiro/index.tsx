// ** React Imports
import { ChangeEvent, Fragment, ReactNode, useRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import { styled, useTheme } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from '../../components/StepperCustomDot'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** React Imports

// ** Next Import
import Link from 'next/link'

// ** MUI Components

// ** Third Party Imports
import Cleave from 'cleave.js/react'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Custom Styled Component
import CleaveWrapper from 'src/@core/styles/libs/react-cleave'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Styles
import 'cleave.js/dist/addons/cleave-phone.us'

interface State {
  password: string
  password2: string
  showPassword: boolean
  showPassword2: boolean
}

const steps = [
  {
    title: 'Valide seu token',
    subtitle: 'Valide o token que foi enviado pelo comercial Play'
  },
  {
    title: 'Personal Info',
    subtitle: 'Setup Information'
  },
  {
    title: 'Social Links',
    subtitle: 'Add Social Links'
  }
]

const defaultAccountValues = {
  email: '',
  username: '',
  password: '',
  'confirm-password': ''
}
const defaultPersonalValues = {
  country: '',
  language: [],
  'last-name': '',
  'first-name': ''
}
const defaultSocialValues = {
  google: '',
  twitter: '',
  facebook: '',
  linkedIn: ''
}

const accountSchema = yup.object().shape({})
const personalSchema = yup.object().shape({
  country: yup.string().required(),
  'last-name': yup.string().required(),
  'first-name': yup.string().required(),
  language: yup.array().min(1).required()
})
const socialSchema = yup.object().shape({
  google: yup.string().required(),
  twitter: yup.string().required(),
  facebook: yup.string().required(),
  linkedIn: yup.string().required()
})

const StepperLinearWithValidation = () => {
  // ** States
  const [activeStep, setActiveStep] = useState<number>(0)

  // ** Hooks
  const {
    reset: accountReset,
    control: accountControl,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors }
  } = useForm({
    defaultValues: defaultAccountValues,
    resolver: yupResolver(accountSchema)
  })
  const {
    reset: personalReset,
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors }
  } = useForm({
    defaultValues: defaultPersonalValues,
    resolver: yupResolver(personalSchema)
  })
  const {
    reset: socialReset,
    control: socialControl,
    handleSubmit: handleSocialSubmit,
    formState: { errors: socialErrors }
  } = useForm({
    defaultValues: defaultSocialValues,
    resolver: yupResolver(socialSchema)
  })

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }
  const handleReset = () => {
    setActiveStep(0)
    socialReset({ google: '', twitter: '', facebook: '', linkedIn: '' })
    accountReset({ email: '', username: '', password: '', 'confirm-password': '' })
    personalReset({ country: '', language: [], 'last-name': '', 'first-name': '' })
  }
  const onSubmit = () => {
    setActiveStep(activeStep + 1)
    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }
  }

  // Input costumizado Token
  const [token, setToken] = useState<string[]>(Array(6).fill(''))
  const tokenInputs = useRef<HTMLInputElement[]>(Array(6).fill(null))

  const handleTokenChange = (index: number, newDigit: string) => {
    if (newDigit.match(/^\d$/)) {
      const newToken = [...token]
      newToken[index] = newDigit
      setToken(newToken)

      if (index < token.length - 1) {
        tokenInputs.current[index + 1]?.focus()
      }
    } else if (newDigit === '') {
      // Allow deletion
      const newToken = [...token]
      newToken[index] = ''
      setToken(newToken)

      if (index > 0) {
        tokenInputs.current[index - 1]?.focus()
      }
    }
  }

  const isTokenComplete = token.every(digit => digit !== '')
  ////

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <form key={0} onSubmit={handleAccountSubmit(onSubmit)}>
            <Grid container spacing={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[0].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[0].subtitle}
                </Typography>
              </Grid>
              <Box sx={{ py: 5 }}>
                {token.map((digit, index) => (
                  <TextField
                    key={index}
                    inputRef={input => {
                      if (input) {
                        tokenInputs.current[index] = input
                      }
                    }}
                    variant='outlined'
                    size='small'
                    type='text'
                    inputProps={{ maxLength: 1 }}
                    onChange={e => handleTokenChange(index, e.target.value)}
                    value={digit}
                    style={{ width: '40px', margin: '0 4px' }}
                  />
                ))}
              </Box>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' disabled>
                  Back
                </Button>
                <Button size='large' type='submit' variant='contained' disabled={!isTokenComplete}>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )

      default:
        return null
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button size='large' variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Fragment>
      )
    } else {
      return getStepContent(activeStep)
    }
  }

  return (
    <Card
      sx={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}
    >
      <CardContent>
        <StepperWrapper>
          <Stepper activeStep={activeStep}>
            {steps.map((step, index) => {
              const labelProps: {
                error?: boolean
              } = {}
              if (index === activeStep) {
                labelProps.error = false
                if (
                  (accountErrors.email ||
                    accountErrors.username ||
                    accountErrors.password ||
                    accountErrors['confirm-password']) &&
                  activeStep === 0
                ) {
                  labelProps.error = true
                } else if (
                  (personalErrors.country ||
                    personalErrors.language ||
                    personalErrors['last-name'] ||
                    personalErrors['first-name']) &&
                  activeStep === 1
                ) {
                  labelProps.error = true
                } else if (
                  (socialErrors.google || socialErrors.twitter || socialErrors.facebook || socialErrors.linkedIn) &&
                  activeStep === 2
                ) {
                  labelProps.error = true
                } else {
                  labelProps.error = false
                }
              }

              return (
                <Step key={index}>
                  <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <Typography className='step-number'>{`0${index + 1}`}</Typography>
                      <div>
                        <Typography className='step-title'>{step.title}</Typography>
                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>

      <Divider sx={{ m: '0 !important' }} />

      <CardContent>{renderContent()}</CardContent>
    </Card>
  )
}

StepperLinearWithValidation.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

StepperLinearWithValidation.guestGuard = true

export default StepperLinearWithValidation
