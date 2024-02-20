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
  hasButton?: boolean
  hasExport?: boolean

  seccondButtonVariant?: 'contained' | 'outlined' | 'text'
  seccondButtonColor?: 'error' | 'info' | 'inherit' | 'primary' | 'secondary' | 'success' | 'warning'
  seccondButtonTitle?: string
  seccondButtonToggle?: () => void
}

const TableHeader = ({
  handleFilter,
  toggle,
  seccondButtonToggle,
  value,
  placeholderSearch,
  titleButton,
  seccondButtonTitle,
  hasButton = true,
  hasExport = true,
  seccondButtonVariant = 'outlined',
  seccondButtonColor = 'primary'
}: TableHeaderProps) => {
  console.log(hasExport)

  return (
    <Box
      sx={{
        px: !hasButton && !hasExport ? 0 : 5,
        py: 5,
        pb: 3,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {hasExport && (
        <Button
          sx={{
            mr: {
              xs: 0,
              sm: 4
            },
            mb: 2,
            width: {
              xs: '100%',
              sm: 'auto'
            }
          }}
          color='secondary'
          variant='outlined'
          startIcon={<Icon icon='mdi:export-variant' fontSize={20} />}
        >
          Exportar
        </Button>
      )}
      <Box
        sx={{
          width: (!hasButton && !hasExport) || !hasExport ? '100%' : 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: {
            xs: 'center',
            sm: 'end'
          }
        }}
      >
        <TextField
          size='small'
          fullWidth={!hasButton && !hasExport}
          value={value}
          sx={{
            mr: {
              xs: 0,
              sm: !hasButton && !hasExport ? 0 : 4
            },
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 5
          }}
          placeholder={placeholderSearch}
          onChange={e => handleFilter(e.target.value)}
          InputProps={{
            startAdornment: <Icon style={{ marginRight: '0.5rem' }} icon='mdi:search' fontSize={28} />
          }}
        />
        {hasButton && (
          <Box display='flex' gap={3}>
            <Button
              sx={{
                mb: 2,
                width: {
                  xs: '100%',
                  sm: 'auto'
                }
              }}
              onClick={toggle}
              variant='contained'
            >
              {titleButton}
            </Button>
            {seccondButtonTitle && (
              <Button
                variant={seccondButtonVariant}
                color={seccondButtonColor}
                onClick={seccondButtonToggle}
                sx={{
                  mb: 2,
                  width: {
                    xs: '100%',
                    sm: 'auto'
                  }
                }}
              >
                {seccondButtonTitle}
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default TableHeader
