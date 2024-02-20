import { useState } from 'react'
import { DataGrid, GridCellParams, gridClasses, GridColDef } from '@mui/x-data-grid'
import { Box, CircularProgress, Divider, Pagination, Typography } from '@mui/material'
import TableHeader from 'src/views/apps/user/list/TableHeader'
import PerfectScrollbar from 'react-perfect-scrollbar'

interface CustomDataGridProps {
  // eslint-disable-next-line lines-around-comment

  // Props Data Grid

  rows: any
  columns: GridColDef[]
  onCellClick?: (params: GridCellParams, event: React.MouseEvent) => void
  filterFunction?: (row: any) => boolean
  checkboxSelection?: boolean
  loading?: boolean

  // Props Table header

  placeholderSearch?: string
  titleButton?: string
  seccondButtonVariant?: 'contained' | 'outlined' | 'text'
  seccondButtonColor?: 'error' | 'info' | 'inherit' | 'primary' | 'secondary' | 'success' | 'warning'
  seccondButtonTitle?: string
  hasButton?: boolean
  hasExport?: boolean
  toggle?: () => void
  seccondButtonToggle?: () => void
}

export default function CustomDataGrid({
  rows,
  columns,
  loading,

  toggle,
  filterFunction,
  seccondButtonToggle,

  seccondButtonColor,
  seccondButtonTitle,

  hasExport,
  hasButton,

  seccondButtonVariant = 'outlined',
  placeholderSearch = 'Buscar',
  titleButton = 'Adicionar',
  checkboxSelection = false,

  ...rest
}: CustomDataGridProps) {
  // ** State
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [searchText, setSearchText] = useState('')

  // Filtrar linhas
  const filteredRows = rows.filter(
    (row: any) =>
      (filterFunction ? filterFunction(row) : true) &&
      columns.some((column: GridColDef) =>
        row[column.field]?.toString().toLowerCase().includes(searchText.toLowerCase())
      )
  )

  return (
    <>
      <TableHeader
        value={searchText}
        handleFilter={setSearchText}
        placeholderSearch={placeholderSearch}
        titleButton={titleButton}
        toggle={toggle}
        seccondButtonVariant={seccondButtonVariant}
        seccondButtonColor={seccondButtonColor}
        seccondButtonTitle={seccondButtonTitle}
        seccondButtonToggle={seccondButtonToggle}
        hasButton={hasButton}
        hasExport={hasExport}
      />
      {loading ? (
        <>
          <Divider />
          <Box width='100%' display='flex' justifyContent='center' py={20}>
            <CircularProgress />
          </Box>
        </>
      ) : filteredRows.length > 0 ? (
        <Box display='flex' flexDirection='column' mx='auto' pb={5}>
          <DataGrid
            autoHeight
            rows={filteredRows}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            hideFooterPagination
            checkboxSelection={checkboxSelection}
            loading={loading}
            localeText={{
              footerRowSelected: count => `${count} linha${count !== 1 ? 's' : ''} selecionada${count !== 1 ? 's' : ''}`
            }}
            getRowSpacing={() => ({
              top: 5,
              bottom: 5
            })}
            sx={{
              [`& .${gridClasses.row}`]: {
                bgcolor: theme => (theme.palette.mode === 'light' ? '#f1f1f1' : '#404040'),
                borderRadius: '8px',
                cursor: 'pointer'
              },
              [`& .${gridClasses.cell}`]: {
                padding: '16px',
                border: 'none'
              },
              [`& .${gridClasses.columnHeader}`]: {
                border: 'none',
                width: 'calc(100% + 8px)'
              },
              [`& .${gridClasses.footerContainer}`]: {
                mt: 1.5
              },
              [`& .${gridClasses.checkboxInput}.Mui-checked`]: {
                color: theme => (theme.palette.mode === 'dark' ? '#f1f1f1' : '#404040')
              }
            }}
            {...rest}
          />

          <Pagination
            count={Math.ceil(filteredRows.length / paginationModel.pageSize)}
            page={paginationModel.page + 1}
            onChange={(event, page) => setPaginationModel(oldModel => ({ ...oldModel, page: page - 1 }))}
            shape='rounded'
            color='primary'
            variant='outlined'
            sx={{ mt: '-1.5rem', mx: 'auto' }}
          />
        </Box>
      ) : (
        <>
          <Divider />
          <Box width='100%' display='flex' justifyContent='center' py={10}>
            <Typography>Busca não encontrada</Typography>
          </Box>
        </>
      )}
    </>
  )
}
