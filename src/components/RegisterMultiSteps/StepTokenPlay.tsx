import { styled, useTheme } from '@mui/material/styles'
import { Box, Button, FormHelperText, Grid, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import CleaveWrapper from 'src/@core/styles/libs/react-cleave'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import Cleave from 'cleave.js/react'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const defaultValues: { [key: string]: string } = {
  val1: '',
  val2: '',
  val3: '',
  val4: '',
  val5: '',
  val6: ''
}

// ** Styled Components

const CleaveInput = styled(Cleave)(({ theme }) => ({
  maxWidth: 50,
  textAlign: 'center',
  height: '50px !important',
  fontSize: '150% !important',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '&:not(:last-child)': {
    marginRight: theme.spacing(2)
  },
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    margin: 0,
    WebkitAppearance: 'none'
  }
}))

interface StepTokenPlayProps {
  handleNext: () => void
}

const StepTokenPlay = ({ handleNext }: StepTokenPlayProps) => {
  // ** State
  const [isBackspace, setIsBackspace] = useState<boolean>(false)
  const [isValidToken, setIsValidToken] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Vars
  const errorsArray = Object.keys(errors)

  const handleChange = (event: ChangeEvent, onChange: (...event: any[]) => void) => {
    if (!isBackspace) {
      onChange(event)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (form[index].value && form[index].value.length) {
        form.elements[index + 1].focus()
      }
      event.preventDefault()
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Backspace') {
      setIsBackspace(true)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (index >= 1) {
        if (!(form[index].value && form[index].value.length)) {
          form.elements[index - 1].focus()
        }
      }
    } else {
      setIsBackspace(false)
    }
  }

  const renderInputs = () => {
    return Object.keys(defaultValues).map((val, index) => (
      <Controller
        key={val}
        name={val}
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <Box
            type='tel'
            maxLength={1}
            value={value}
            autoFocus={index === 0}
            component={CleaveInput}
            onKeyDown={handleKeyDown}
            onChange={(event: ChangeEvent) => handleChange(event, onChange)}
            options={{ blocks: [1], numeral: true, numeralPositiveOnly: true }}
            sx={{ [theme.breakpoints.down('sm')]: { px: `${theme.spacing(2)} !important` } }}
          />
        )}
      />
    ))
  }

  function handleSubmitTokenPlay(data: any) {
    console.log(data)
    setIsValidToken(true)
  }

  return (
    <Box display='flex' flexDirection='column' alignItems='center' textAlign='center'>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h5'>Código de Validação</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Insira o código fornecido pelo Comercial Play</Typography>
      </Box>

      <Grid container spacing={5}>
        <Grid item xs={12} sm={6} mx='auto' mb={10}>
          <form onSubmit={handleSubmit(handleSubmitTokenPlay)}>
            <CleaveWrapper
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                ...(errorsArray.length && {
                  '& .invalid:focus': {
                    borderColor: theme => `${theme.palette.error.main} !important`,
                    boxShadow: theme => `0 1px 3px 0 ${hexToRGBA(theme.palette.error.main, 0.4)}`
                  }
                })
              }}
            >
              {renderInputs()}
            </CleaveWrapper>
            {errorsArray.length ? (
              <FormHelperText sx={{ color: 'error.main' }}>Please enter a valid OTP</FormHelperText>
            ) : null}
            <Button fullWidth type='submit' variant='contained' sx={{ mt: 4 }}>
              Verificar meu Código
            </Button>
          </form>
        </Grid>

        {isValidToken && (
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant='contained'
                onClick={handleNext}
                endIcon={<Icon icon='mdi:chevron-right' fontSize={20} />}
              >
                Next
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default StepTokenPlay
