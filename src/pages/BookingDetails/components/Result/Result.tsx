import { IoPersonSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

import { TextField } from '@mui/material'

import { GetBookingDetailsAPI } from '@/api-models/bookings'
import { Column } from '@/components/Column'
import { LoadingContainer } from '@/components/LoadingContainer'
import { Row } from '@/components/Row'
import { StateMessage } from '@/components/StateMessage'
import { HTTPStatusCode } from '@/constants/HTTPStatusCode'
import dateFormat from '@/infrastructure/dateFormat'
import { ApiErrorResponse } from '@/services/http/errorInterceptor'

interface ResultProps {
  data?: GetBookingDetailsAPI.GetResponse
  error?: ApiErrorResponse
  loading: boolean
  onRetry: () => void
}

function Result({ loading, onRetry, data, error }: ResultProps) {
  const navigate = useNavigate()

  if (loading) return <LoadingContainer title="Loading details..." />

  if (error) {
    const notFoundError = error?.status === HTTPStatusCode.NotFound

    return (
      <StateMessage
        type="error"
        title={error.title}
        subtitle={error.detail}
        buttonAction={() => (notFoundError ? navigate('/') : onRetry())}
        buttonLabel={notFoundError ? 'Back to home' : 'Try again'}
      />
    )
  }

  if (!data) return null

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
              defaultValue={data.customer.name}
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
              defaultValue={data.customer.document}
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
              defaultValue={data.customer.document}
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
          <IoPersonSharp color="#3dc299" size={22} />
          <h2 style={{ marginLeft: 16 }}>Period</h2>
        </Row>

        <Row>
          <Column marginRight={140} width={180}>
            <TextField
              label="Check-in"
              defaultValue={dateFormat.format(data.checkInAt)}
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
              defaultValue={dateFormat.format(data.checkOutAt)}
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

export { Result }
