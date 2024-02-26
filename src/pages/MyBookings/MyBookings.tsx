import { useEffect } from 'react'

import { ListBookingsAPI } from '@/api-models/bookings'
import { Layout } from '@/components/Layout'
import useHttpStateful from '@/hooks/useHttpStateful'
import usePageTitle from '@/hooks/usePageTitle'

import { BookingsTable } from './components/BookingsTable'

function MyBookingsPage() {
  usePageTitle('My Bookings')

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
    <Layout.Sheet>
      <h1 style={{ marginBottom: 24 }}>My bookings</h1>

      <BookingsTable data={bookingsList} error={listBookingsError} loading={isLoadingBookings} onRetry={listBookings} />
    </Layout.Sheet>
  )
}

export default MyBookingsPage
