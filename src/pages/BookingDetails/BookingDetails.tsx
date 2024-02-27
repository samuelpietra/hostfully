import { useEffect, useMemo } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@mui/material'

import { GetBookingDetailsAPI } from '@/api-models/bookings'
import { Layout } from '@/components/Layout'
import useHttpStateful from '@/hooks/useHttpStateful'
import usePageTitle from '@/hooks/usePageTitle'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import { useBookingsStore } from '@/store/bookings'

import { Result } from './components/Result'

function BookingDetailsPage() {
  usePageTitle('Booking details')

  const { storedDetails, setStoredDetails } = useBookingsStore()
  const { id: currentBookingId = '' } = useParams<{ id: string }>()

  const navigate = useNavigate()
  const dimensions = useWindowDimensions()

  const Wrapper = useMemo(() => (dimensions.width < Layout.MIN_WIDTH ? Layout.Screen : Layout.Sheet), [dimensions])

  const {
    isLoading: isLoadingBookingDetails,
    request: getBookingDetails,
    error: getBookingDetailsError
  } = useHttpStateful<GetBookingDetailsAPI.GetResponse, GetBookingDetailsAPI.RequestParams>('get', '/bookings/:id')

  useEffect(() => {
    if (storedDetails?.id !== currentBookingId) {
      const fetchNewData = async () => {
        const { payload } = await getBookingDetails({
          urlParams: { id: currentBookingId }
        })

        if (payload) setStoredDetails(payload)
      }

      void fetchNewData()
    }
  }, [currentBookingId, getBookingDetails, setStoredDetails, storedDetails?.id])

  return (
    <Wrapper>
      <h1 style={{ marginBottom: 24 }}>Booking details</h1>

      <Layout.Content>
        <Result
          data={storedDetails}
          error={getBookingDetailsError}
          loading={isLoadingBookingDetails}
          onRetry={() => void getBookingDetails()}
        />
      </Layout.Content>

      <Layout.Footer>
        <Button onClick={() => navigate('/')} size="small" startIcon={<FaChevronLeft color="#3dc299" />}>
          Back
        </Button>
      </Layout.Footer>
    </Wrapper>
  )
}

export default BookingDetailsPage
