// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface TableHeaderProps {
  value: string
  placeholderSearch: string
  titleButton?: string
  toggle?: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, toggle, value, placeholderSearch, titleButton } = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Button
        sx={{ mr: 4, mb: 2 }}
        color='secondary'
        variant='outlined'
        startIcon={<Icon icon='mdi:export-variant' fontSize={20} />}
      >
        Exportar
      </Button>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4, mb: 2, display: 'flex', alignItems: 'center', gap: 5 }}
          placeholder={placeholderSearch}
          onChange={e => handleFilter(e.target.value)}
          InputProps={{
            startAdornment: <Icon style={{ marginRight: '0.5rem' }} icon='mdi:search' fontSize={28} />
          }}
        />
        {titleButton && (
          <Button sx={{ mb: 2 }} onClick={toggle} variant='contained'>
            {titleButton}
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default TableHeader
