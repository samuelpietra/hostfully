import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { GetBookingDetailsAPI } from '@/api-models/bookings'
import { Layout } from '@/components/Layout'
import { LoadingContainer } from '@/components/LoadingContainer'
import { StateMessage } from '@/components/StateMessage'
import { HTTPStatusCode } from '@/constants/HTTPStatusCode'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import { ApiErrorResponse } from '@/services/http/errorInterceptor'

import { MobileForm } from '../MobileForm'
import { WebForm } from '../WebForm'

interface ResultProps {
  data?: GetBookingDetailsAPI.GetResponse
  error?: ApiErrorResponse
  loading: boolean
  onRetry: () => void
}

function Result({ loading, onRetry, data, error }: ResultProps) {
  const navigate = useNavigate()
  const dimensions = useWindowDimensions()

  const Component = useMemo(() => (dimensions.width < Layout.MIN_WIDTH ? MobileForm : WebForm), [dimensions])

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

  return <Component {...data} />
}

export { Result }
