// ** React Imports

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'

// ** Icon Imports
import { DialogTitle, Divider } from '@mui/material'
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

const VisualizarContaFaturaDialog = (props: Props) => {
  // ** Props
  const { open, setOpen } = props

  const handleClose = () => setOpen(false)

  return (
    <Dialog fullWidth open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 900 } }}>
      <DialogTitle display='flex' justifyContent='center' alignItems='center' gap={3}>
        <Typography variant='h5'>Conta Fatura - Play3303060</Typography>
      </DialogTitle>
      <Divider sx={{ width: '90%', mx: 'auto' }} />
      <DialogContent
        sx={{
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <CustomDataGrid
          columns={columns}
          rows={rows}
          checkboxSelection
          titleButton='Criar Nova Conta Fatura'
          hasButton={false}
          hasExport={false}
        />
      </DialogContent>
    </Dialog>
  )
}

export default VisualizarContaFaturaDialog
