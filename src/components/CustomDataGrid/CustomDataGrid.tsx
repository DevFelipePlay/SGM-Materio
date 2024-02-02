import { useState } from 'react'
import { DataGrid, GridCellParams, gridClasses, GridColDef } from '@mui/x-data-grid'
import { Box, Divider, Pagination, Typography } from '@mui/material'
import TableHeader from 'src/views/apps/user/list/TableHeader'

interface CustomDataGridProps {
  rows: any
  columns: GridColDef[]
  filterFunction: (row: any) => boolean
  onCellClick?: (params: GridCellParams, event: React.MouseEvent) => void
}

export default function CustomDataGrid({ rows, columns, filterFunction, ...rest }: CustomDataGridProps) {
  // ** State
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [searchText, setSearchText] = useState('')

  // Filtrar linhas
  const filteredRows = rows.filter(
    (row: any) =>
      filterFunction(row) &&
      columns.some((column: GridColDef) =>
        row[column.field]?.toString().toLowerCase().includes(searchText.toLowerCase())
      )
  )

  return (
    <>
      <TableHeader
        value={searchText}
        handleFilter={setSearchText}
        placeholderSearch='Buscar Cliente'
        titleButton='Novo Cliente'
      />
      {filteredRows.length > 0 ? (
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
            getRowSpacing={params => ({
              top: params.isFirstVisible ? 10 : 5,
              bottom: params.isLastVisible ? 10 : 5
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
                border: 'none'
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
