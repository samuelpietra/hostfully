import { useNavigate } from 'react-router-dom'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { ListBookingsAPI } from '@/api-models/bookings'
import dateFormat from '@/infrastructure/dateFormat'

const CELL_STYLE = { borderColor: '#777', color: '#ccc' }
const COLUMNS = ['Customer', 'Check-in', 'Check-out']

interface BookingsTableProps {
  items: ListBookingsAPI.Item[]
}

function BookingsTable({ items }: BookingsTableProps) {
  const navigate = useNavigate()

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {COLUMNS.map((column) => (
              <TableCell
                key={column}
                sx={{
                  background: '#1d2025',
                  color: '#ccc',
                  fontWeight: 'bold'
                }}
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((item, index) => {
            const isEven = index % 2 === 0

            return (
              <TableRow
                key={item.id}
                onClick={() => navigate(`${item.id}`)}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { background: '#2d313b' },
                  'background': `${isEven ? '#282c35' : '#252931'}`,
                  'cursor': 'pointer'
                }}
              >
                <TableCell sx={CELL_STYLE}>{item.customerName}</TableCell>
                <TableCell sx={CELL_STYLE}>{dateFormat.format(item.checkInAt)}</TableCell>
                <TableCell sx={CELL_STYLE}>{dateFormat.format(item.checkOutAt)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export { BookingsTable }
