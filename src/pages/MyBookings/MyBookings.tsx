import { useCallback, useEffect, useMemo } from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoMdRefresh } from 'react-icons/io'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { Button, IconButton } from '@mui/material'

import { ListBookingsAPI } from '@/api-models/bookings'
import { Layout } from '@/components/Layout'
import { Row } from '@/components/Row'
import useHttpStateful from '@/hooks/useHttpStateful'
import usePageTitle from '@/hooks/usePageTitle'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import { useBookingsStore } from '@/store/bookings'

import { Result } from './components/Result'

function MyBookingsPage() {
  usePageTitle('My Bookings')

  const { storedList, setStoredList, reset } = useBookingsStore()
  const [searchParams, setSearchParams] = useSearchParams()

  const navigate = useNavigate()
  const dimensions = useWindowDimensions()

  const shouldRefresh = useMemo(() => searchParams.get('refresh') === 'true', [searchParams])
  const Wrapper = useMemo(() => (dimensions.width < Layout.MIN_WIDTH ? Layout.Screen : Layout.Sheet), [dimensions])

  const {
    isLoading: isLoadingBookings,
    request: listBookings,
    error: listBookingsError
  } = useHttpStateful<ListBookingsAPI.GetResponse, ListBookingsAPI.RequestParams>('get', '/bookings')

  const handleManualRefresh = useCallback(() => {
    reset()
    void listBookings()
  }, [listBookings, reset])

  useEffect(() => {
    if (shouldRefresh || !storedList) {
      const fetchNewData = async () => {
        const { payload } = await listBookings()

        if (payload) {
          setStoredList(payload)
          searchParams.delete('refresh')
          setSearchParams(searchParams)
        }
      }

      void fetchNewData()
    }
  }, [listBookings, searchParams, setSearchParams, setStoredList, shouldRefresh, storedList])

  return (
    <Wrapper>
      <Row justifyContent="space-between" marginBottom={24}>
        <Row alignItems="center">
          <h1 style={{ marginRight: 12 }}>My bookings</h1>

          <IconButton disabled={isLoadingBookings} style={{ padding: 0 }} onClick={handleManualRefresh}>
            <IoMdRefresh color={isLoadingBookings ? '#777' : '#3dc299'} size={32} />
          </IconButton>
        </Row>

        <Button
          disabled={isLoadingBookings}
          onClick={() => navigate('new')}
          size="small"
          startIcon={<FaPlus color="#3dc299" size={18} />}
          variant="outlined"
        >
          New
        </Button>
      </Row>

      <Layout.Content>
        <Result
          data={storedList}
          error={listBookingsError}
          loading={isLoadingBookings}
          onRetry={() => void listBookings()}
        />
      </Layout.Content>
    </Wrapper>
  )
}

export default MyBookingsPage
