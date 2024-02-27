import { useEffect, useMemo } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@mui/material'

import { GetBookingDetailsAPI } from '@/api-models/bookings'
import { Layout } from '@/components/Layout'
import { Row } from '@/components/Row'
import useHttpStateful from '@/hooks/useHttpStateful'
import usePageTitle from '@/hooks/usePageTitle'
import useWindowDimensions from '@/hooks/useWindowDimensions'

import { Result } from './components/Result'

function BookingDetailsPage() {
  usePageTitle('Booking details')

  const { id = '' } = useParams<{ id: string }>()

  const navigate = useNavigate()
  const dimensions = useWindowDimensions()

  const Wrapper = useMemo(() => (dimensions.width < Layout.MIN_WIDTH ? Layout.Screen : Layout.Sheet), [dimensions])

  const {
    isLoading: isLoadingBookingDetails,
    payload: bookingDetails,
    request: getBookingDetails,
    error: getBookingDetailsError
  } = useHttpStateful<GetBookingDetailsAPI.GetResponse, GetBookingDetailsAPI.RequestParams>('get', '/bookings/:id')

  useEffect(() => {
    void getBookingDetails({ urlParams: { id } })
  }, [])

  return (
    <Wrapper>
      <h1 style={{ marginBottom: 24 }}>Booking details</h1>

      <Layout.Content>
        <Result
          data={bookingDetails}
          error={getBookingDetailsError}
          loading={isLoadingBookingDetails}
          onRetry={getBookingDetails}
        />
      </Layout.Content>

      <Layout.Footer>
        <Button onClick={() => navigate(-1)} size="small" startIcon={<FaChevronLeft color="#3dc299" />}>
          Back
        </Button>
      </Layout.Footer>
    </Wrapper>
  )
}

export default BookingDetailsPage
