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
          {items.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => navigate(`${item.id}`)}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                '&:hover': { background: '#2d313b' },
                'background': '#252931',
                'cursor': 'pointer'
              }}
            >
              <TableCell sx={{ borderColor: '#777', color: '#ccc' }}>{item.customerName}</TableCell>
              <TableCell sx={{ borderColor: '#777', color: '#ccc' }}>{dateFormat.format(item.checkInAt)}</TableCell>
              <TableCell sx={{ borderColor: '#777', color: '#ccc' }}>{dateFormat.format(item.checkOutAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export { BookingsTable }
