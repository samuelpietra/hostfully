import { useNavigate } from 'react-router-dom'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { ListBookingsAPI } from '@/api-models/bookings'
import { LoadingContainer } from '@/components/LoadingContainer'
import { StateMessage } from '@/components/StateMessage'
import dateFormat from '@/infrastructure/dateFormat'
import { ApiErrorResponse } from '@/services/http/errorInterceptor'

const COLUMNS = ['Customer', 'Check-in', 'Check-out']

interface BookingsTableProps {
  data?: ListBookingsAPI.GetResponse
  error?: ApiErrorResponse
  loading: boolean
  onRetry: () => void
}

function BookingsTable({ loading, onRetry, data, error }: BookingsTableProps) {
  const navigate = useNavigate()

  if (loading) return <LoadingContainer title="Loading bookings..." />

  if (error) {
    return (
      <StateMessage
        type="error"
        title={error.title}
        subtitle={error.detail}
        buttonAction={onRetry}
        buttonLabel="Try again"
      />
    )
  }

  if (data?.totalCount === 0) {
    return <StateMessage type="empty" title="Nothing to show" subtitle="Try scheduling a booking!" />
  }

  const { items = [] } = data ?? {}

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {COLUMNS.map((column) => (
              <TableCell
                key={column}
                sx={{
                  background: '#252931',
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
                '&:hover': { background: '#bbb' },
                'background': '#999',
                'cursor': 'pointer'
              }}
            >
              <TableCell>{item.customerName}</TableCell>
              <TableCell>{dateFormat.format(item.checkInAt)}</TableCell>
              <TableCell>{dateFormat.format(item.checkOutAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export { BookingsTable }
