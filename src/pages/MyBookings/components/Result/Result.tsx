import { useMemo } from 'react'

import { ListBookingsAPI } from '@/api-models/bookings'
import { Layout } from '@/components/Layout'
import { LoadingContainer } from '@/components/LoadingContainer'
import { StateMessage } from '@/components/StateMessage'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import { ApiErrorResponse } from '@/services/http/errorInterceptor'

import { BookingsList } from '../BookingsList'
import { BookingsTable } from '../BookingsTable'

interface ResultProps {
  data?: ListBookingsAPI.GetResponse
  error?: ApiErrorResponse
  loading: boolean
  onRetry: () => void
}

function Result({ loading, onRetry, data, error }: ResultProps) {
  const dimensions = useWindowDimensions()

  const Component = useMemo(() => (dimensions.width < Layout.MIN_WIDTH ? BookingsList : BookingsTable), [dimensions])

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

  return <Component items={items} />
}

export { Result }
