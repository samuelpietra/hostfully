import { IoCalendar, IoPersonSharp } from 'react-icons/io5'

import { TextField } from '@mui/material'

import { GetBookingDetailsAPI } from '@/api-models/bookings'
import { Column } from '@/components/Column'
import { Row } from '@/components/Row'
import dateFormat from '@/infrastructure/dateFormat'

function WebForm({ checkInAt, checkOutAt, customer }: GetBookingDetailsAPI.GetResponse) {
  return (
    <Column>
      <Column marginBottom={72}>
        <Row alignItems="center" borderBottom="1px dashed #555" marginBottom={24} paddingBottom={8}>
          <IoPersonSharp color="#3dc299" size={22} />
          <h2 style={{ marginLeft: 16 }}>Customer</h2>
        </Row>

        <Row>
          <Column marginRight={100} width={220}>
            <TextField
              label="Name"
              defaultValue={customer.name}
              fullWidth
              InputProps={{
                readOnly: true
              }}
              variant="standard"
            />
          </Column>

          <Column marginRight={100} width={120}>
            <TextField
              label="Document"
              defaultValue={customer.document}
              fullWidth
              InputProps={{
                readOnly: true
              }}
              variant="standard"
            />
          </Column>

          <Column width={120}>
            <TextField
              label="Phone"
              defaultValue={customer.phone}
              fullWidth
              InputProps={{
                readOnly: true
              }}
              variant="standard"
            />
          </Column>
        </Row>
      </Column>

      <Column>
        <Row alignItems="center" borderBottom="1px dashed #555" marginBottom={24} paddingBottom={8}>
          <IoCalendar color="#3dc299" size={22} />
          <h2 style={{ marginLeft: 16 }}>Period</h2>
        </Row>

        <Row>
          <Column marginRight={140} width={180}>
            <TextField
              label="Check-in"
              defaultValue={dateFormat.format(checkInAt)}
              fullWidth
              InputProps={{
                readOnly: true
              }}
              variant="standard"
            />
          </Column>

          <Column marginRight={100} width={180}>
            <TextField
              label="Check-out"
              defaultValue={dateFormat.format(checkOutAt)}
              fullWidth
              InputProps={{
                readOnly: true
              }}
              variant="standard"
            />
          </Column>
        </Row>
      </Column>
    </Column>
  )
}

export { WebForm }
