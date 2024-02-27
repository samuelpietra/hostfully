import { IoPersonSharp } from 'react-icons/io5'

import { TextField } from '@mui/material'

import { GetBookingDetailsAPI } from '@/api-models/bookings'
import { Card } from '@/components/Card'
import { Column } from '@/components/Column'
import { Row } from '@/components/Row'
import dateFormat from '@/infrastructure/dateFormat'

function MobileForm({ checkInAt, checkOutAt, customer }: GetBookingDetailsAPI.GetResponse) {
  return (
    <Column>
      <Card background="#2d313b" marginBottom={20}>
        <Column width="100%">
          <Row alignItems="center" borderBottom="1px dashed #555" marginBottom={24} paddingBottom={8}>
            <IoPersonSharp color="#3dc299" size={22} />
            <h2 style={{ marginLeft: 16 }}>Customer</h2>
          </Row>

          <Column marginBottom={16} width={272}>
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

          <Row>
            <Column marginRight={32} width={120}>
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
      </Card>

      <Card background="#2d313b">
        <Column width="100%">
          <Row alignItems="center" borderBottom="1px dashed #555" marginBottom={24} paddingBottom={8}>
            <IoPersonSharp color="#3dc299" size={22} />
            <h2 style={{ marginLeft: 16 }}>Period</h2>
          </Row>

          <Column marginBottom={16} width={272}>
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

          <Column width={272}>
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
        </Column>
      </Card>
    </Column>
  )
}

export { MobileForm }
