import { useEffect, useMemo, useState } from 'react'
import { FaChevronLeft, FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { Button } from '@mui/material'

import { GetBookingDetailsAPI } from '@/api-models/bookings'
import { Layout } from '@/components/Layout'
import { Row } from '@/components/Row'
import useHttpStateful from '@/hooks/useHttpStateful'
import usePageTitle from '@/hooks/usePageTitle'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import { useBookingsStore } from '@/store/bookings'

import { DeleteConfirmationDialog } from './components/DeleteConfirmationDialog'
import { Result } from './components/Result'

function BookingDetailsPage() {
  usePageTitle('Booking details')

  const { storedDetails, setStoredDetails } = useBookingsStore()
  const [showDialog, setShowDialog] = useState(false)

  const { id: currentBookingId = '' } = useParams<{ id: string }>()
  const [searchParams, setSearchParams] = useSearchParams()

  const navigate = useNavigate()
  const dimensions = useWindowDimensions()

  const shouldRefresh = useMemo(() => searchParams.get('refresh') === 'true', [searchParams])
  const Wrapper = useMemo(() => (dimensions.width < Layout.MIN_WIDTH ? Layout.Screen : Layout.Sheet), [dimensions])

  const {
    isLoading: isLoadingBookingDetails,
    request: getBookingDetails,
    error: getBookingDetailsError
  } = useHttpStateful<GetBookingDetailsAPI.GetResponse, GetBookingDetailsAPI.RequestParams>('get', '/bookings/:id')

  useEffect(() => {
    if (shouldRefresh || storedDetails?.id !== currentBookingId) {
      const fetchNewData = async () => {
        const { payload } = await getBookingDetails({
          urlParams: { id: currentBookingId }
        })

        if (payload) {
          setStoredDetails(payload)
          searchParams.delete('refresh')
          setSearchParams(searchParams)
        }
      }

      void fetchNewData()
    }
  }, [
    currentBookingId,
    getBookingDetails,
    searchParams,
    setSearchParams,
    setStoredDetails,
    shouldRefresh,
    storedDetails?.id
  ])

  return (
    <Wrapper>
      <h1 style={{ marginBottom: 24 }}>Booking details</h1>

      <Layout.Content>
        <DeleteConfirmationDialog
          bookingId={currentBookingId}
          onCancel={() => setShowDialog(false)}
          onConfirm={() => navigate('/?refresh=true')}
          visible={showDialog}
        />

        <Result
          data={storedDetails}
          error={getBookingDetailsError}
          loading={isLoadingBookingDetails}
          onRetry={() => void getBookingDetails()}
        />
      </Layout.Content>

      <Layout.Footer justifyContent="space-between">
        <Button onClick={() => navigate('/')} size="small" startIcon={<FaChevronLeft color="#3dc299" size={18} />}>
          Back
        </Button>

        <Row>
          <Button
            sx={{ marginRight: 2 }}
            disabled={isLoadingBookingDetails}
            onClick={() => setShowDialog(true)}
            size="small"
            startIcon={<FaRegTrashAlt color="#e06c75" size={18} />}
          >
            Delete
          </Button>

          <Button
            disabled={isLoadingBookingDetails}
            onClick={() => navigate(`/${currentBookingId}/edit`)}
            size="small"
            startIcon={<FaPencilAlt color="#3dc299" size={18} />}
          >
            Edit
          </Button>
        </Row>
      </Layout.Footer>
    </Wrapper>
  )
}

export default BookingDetailsPage
