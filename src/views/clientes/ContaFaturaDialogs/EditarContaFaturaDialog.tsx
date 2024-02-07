// ** React Imports

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'

// ** Icon Imports
import { DialogTitle, Divider, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import CustomDataGrid from 'src/components/CustomDataGrid/CustomDataGrid'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}

const columns: GridColDef[] = [
  {
    flex: 0.1,
    minWidth: 100,
    field: 'msisdn',
    headerName: 'MSISDN'
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'iccid',
    headerName: 'ICCID'
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'nomeDaLinha',
    headerName: 'Nome da Linha'
  }
]

const rows = [
  {
    id: 1,
    msisdn: '(61) 92004-6957',
    iccid: '8955170110322149723',
    nomeDaLinha: 'Atendimento'
  },
  {
    id: 2,
    msisdn: '(61) 92002-9499',
    iccid: '8955170110333027306',
    nomeDaLinha: '-'
  }
]

const EditarContaFaturaDialog = (props: Props) => {
  // ** Props
  const { open, setOpen } = props

  // ** Functions

  const handleClose = () => setOpen(false)

  return (
    <Dialog fullWidth open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 900 } }}>
      <DialogTitle display='flex' justifyContent='center' alignItems='center' gap={3}>
        <Typography variant='h5'>Editar Conta Fatura</Typography>
      </DialogTitle>
      <Divider sx={{ width: '90%', mx: 'auto' }} />
      <DialogContent
        sx={{
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <Grid item xs={12} px={5}>
          <FormControl fullWidth>
            <InputLabel id='mvno-select'>Conta Fatura</InputLabel>
            <Select
              fullWidth
              id='mvno-select'
              label='Conta Fatura'
              labelId='mvno-select'
              inputProps={{ placeholder: 'Selecione o Tipo de Cliente' }}
              defaultValue='play3303060'
            >
              <MenuItem value='play3303060'>Play3303060</MenuItem>
              <MenuItem value='play3307620'>Play3307620</MenuItem>
              <MenuItem value='play3302080'>Play3302080</MenuItem>
              <MenuItem value='play3307200'>Play3307200</MenuItem>
              <MenuItem value='play3309570'>Play3309570</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <CustomDataGrid
          columns={columns}
          rows={rows}
          checkboxSelection
          titleButton='Adicionar'
          seccondButtonTitle='Remover'
          seccondButtonColor='error'
          hasExport={false}
        />
      </DialogContent>
    </Dialog>
  )
}

export default EditarContaFaturaDialog
