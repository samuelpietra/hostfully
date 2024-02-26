import { useEffect, useMemo } from 'react'

import { ListBookingsAPI } from '@/api-models/bookings'
import { Layout } from '@/components/Layout'
import useHttpStateful from '@/hooks/useHttpStateful'
import usePageTitle from '@/hooks/usePageTitle'
import useWindowDimensions from '@/hooks/useWindowDimensions'

import { Result } from './components/Result'

function MyBookingsPage() {
  usePageTitle('My Bookings')

  const dimensions = useWindowDimensions()

  const Wrapper = useMemo(() => (dimensions.width < Layout.MIN_WIDTH ? Layout.Screen : Layout.Sheet), [dimensions])

  const {
    isLoading: isLoadingBookings,
    payload: bookingsList,
    request: listBookings,
    error: listBookingsError
  } = useHttpStateful<ListBookingsAPI.GetResponse, ListBookingsAPI.RequestParams>('get', '/bookings')

  useEffect(() => {
    void listBookings()
  }, [])

  return (
    <Wrapper>
      <h1 style={{ marginBottom: 24 }}>My bookings</h1>

      <Result data={bookingsList} error={listBookingsError} loading={isLoadingBookings} onRetry={listBookings} />
    </Wrapper>
  )
}

export default MyBookingsPage
