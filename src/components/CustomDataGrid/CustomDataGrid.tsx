import { useState } from 'react'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { Box, Typography } from '@mui/material'
import TableHeader from 'src/views/apps/user/list/TableHeader'

interface CustomDataGridProps {
  rows: any
  columns: any
}

export default function CustomDataGrid({ rows, columns }: CustomDataGridProps) {
  // ** State
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [searchText, setSearchText] = useState('')

  // Filtrar linhas
  const filteredRows = rows.filter((row: any) =>
    columns.some((column: any) => row[column.field]?.toString().toLowerCase().includes(searchText.toLowerCase()))
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
        <DataGrid
          autoHeight
          rows={filteredRows}
          columns={columns}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
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
        />
      ) : (
        <Box width='100%' display='flex' justifyContent='center' mt={5} py={10} borderTop='1px solid #454545'>
          <Typography>Busca não encontrada</Typography>
        </Box>
      )}
    </>
  )
}
