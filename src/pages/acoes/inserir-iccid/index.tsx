// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Box,
  Button,
  CardActions,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Tab,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import FileUploaderExcel from 'src/components/Components/FileUploaderExcel/FileUploaderExcel'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import useClipboard from 'src/@core/hooks/useClipboard'

const SchemaInsertICCIDFormData = z.object({
  iccid: z.string().min(1, 'ICCID é obrigatório'),
  excel: z.any()
})

type InsertICCIDType = z.infer<typeof SchemaInsertICCIDFormData>

const InserirICCID = () => {
  const [value, setValue] = useState<string>('inserir')

  const handleTabsChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  // ** Hooks
  const { copy } = useClipboard()

  // ** React Hook Form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<InsertICCIDType>({
    resolver: zodResolver(SchemaInsertICCIDFormData),
    defaultValues: {
      iccid: ''
    }
  })

  async function insertICCID(data: InsertICCIDType) {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(data)
  }

  return (
    <Card>
      <CardHeader
        title={
          value === 'inserir' ? (
            'Inserir ICCID'
          ) : (
            <Box display='flex' alignItems='center' gap={2}>
              <Typography variant='h6' sx={{ textAlign: 'center' }}>
                Inserir ICCID's
              </Typography>
              <Tooltip
                title={
                  <Box>
                    <Typography color='white' textAlign='center' fontWeight='700' fontSize='1rem' mt={2}>
                      Como Preencher o Excel?
                    </Typography>
                    <Box component='ul'>
                      <Typography component='li' color='white' fontSize='0.875rem'>
                        ICCID: Número do ICCID que deseja inserir.
                      </Typography>
                      <Typography component='li' color='white' fontSize='0.875rem'>
                        CompanyID: Número do ID da empresa, está disponível ao lado do botão de download.
                      </Typography>
                      <Typography component='li' color='white' fontSize='0.875rem'>
                        Revendedor: CPF/CNPJ do revendedor que deseja inserir os iccids.
                      </Typography>
                    </Box>
                  </Box>
                }
              >
                <Icon cursor='pointer' icon='mdi:information-outline' fontSize={18} />
              </Tooltip>
            </Box>
          )
        }
      />
      <TabContext value={value}>
        <TabList
          variant='scrollable'
          scrollButtons={false}
          onChange={handleTabsChange}
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab value='inserir' label='Inserir' />
          <Tab value='inserir-multiplos' label='Inserir Múltiplos' />
        </TabList>
        <CardContent>
          <TabPanel value='inserir'>
            <Grid container spacing={5} component='form'>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='ICCID*'
                  placeholder='8955000000000000000'
                  {...register('iccid')}
                  error={!!errors.iccid}
                  helperText={errors.iccid?.message}
                />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value='inserir-multiplos'>
            <Box mb={4} display='flex' gap={2} justifyContent='start' alignItems='center'>
              <Chip label='CompanyID: 46' onClick={() => copy('46')} />
              <Tooltip title='Baixar Modelo'>
                <IconButton>
                  <Icon icon='mdi:download' fontSize={20} color='#56CA00' />
                </IconButton>
              </Tooltip>
            </Box>
            <DropzoneWrapper>
              <Controller name='excel' control={control} render={({ field }) => <FileUploaderExcel {...field} />} />
            </DropzoneWrapper>
          </TabPanel>
        </CardContent>
        <Divider sx={{ m: '0 !important' }} />
        <CardActions>
          <Button
            size='large'
            type='submit'
            sx={{ mr: 2 }}
            variant='contained'
            onClick={handleSubmit(insertICCID)}
            disabled={isSubmitting}
          >
            {value === 'inserir'
              ? isSubmitting
                ? 'Inserindo...'
                : 'Inserir'
              : isSubmitting
              ? 'Enviando...'
              : 'Enviar Lista'}
          </Button>
          {value === 'inserir' && (
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='outlined' color='error'>
              Remover
            </Button>
          )}
        </CardActions>
      </TabContext>
    </Card>
  )
}

export default InserirICCID
