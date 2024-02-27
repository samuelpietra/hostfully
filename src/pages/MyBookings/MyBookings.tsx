import { useEffect, useMemo } from 'react'
import { IoMdRefresh } from 'react-icons/io'
import { useSearchParams } from 'react-router-dom'

import { IconButton } from '@mui/material'

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

  const { storedList, setStoredList } = useBookingsStore()
  const [searchParams, setSearchParams] = useSearchParams()

  const dimensions = useWindowDimensions()

  const shouldRefresh = useMemo(() => searchParams.get('refresh') === 'true', [searchParams])
  const Wrapper = useMemo(() => (dimensions.width < Layout.MIN_WIDTH ? Layout.Screen : Layout.Sheet), [dimensions])

  const {
    isLoading: isLoadingBookings,
    request: listBookings,
    error: listBookingsError
  } = useHttpStateful<ListBookingsAPI.GetResponse, ListBookingsAPI.RequestParams>('get', '/bookings')

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
      <Row alignItems="center" marginBottom={24}>
        <h1 style={{ marginRight: 8 }}>My bookings</h1>

        <IconButton style={{ padding: 0 }} onClick={() => void listBookings()}>
          <IoMdRefresh size={32} />
        </IconButton>
      </Row>

      <Result
        data={storedList}
        error={listBookingsError}
        loading={isLoadingBookings}
        onRetry={() => void listBookings()}
      />
    </Wrapper>
  )
}

export default MyBookingsPage
