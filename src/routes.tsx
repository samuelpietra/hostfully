import { lazy, Suspense } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import { Layout } from '@/components/Layout'
import { LoadingContainer } from '@/components/LoadingContainer'
import { IRoute, RoutesCreator } from '@/RoutesCreator'

const BookingDetailsPage = lazy(() => import('@/pages/BookingDetails'))
const EditBookingPage = lazy(() => import('@/pages/EditBooking'))
const MyBookingsPage = lazy(() => import('@/pages/MyBookings'))

const ROUTES: IRoute[] = [
  {
    element: <MyBookingsPage />,
    path: '/'
  },
  {
    element: <BookingDetailsPage />,
    path: ':id'
  },
  {
    element: <EditBookingPage />,
    path: ':id/edit'
  },
  {
    element: <EditBookingPage />,
    path: 'new'
  }
]

const routes = createRoutesFromElements([
  <Route
    id="general"
    path="*"
    element={
      <Layout>
        <Suspense fallback={<LoadingContainer />}>
          <RoutesCreator routes={ROUTES} />
        </Suspense>
      </Layout>
    }
  />
])

const router = createBrowserRouter(routes)

function Routes() {
  return <RouterProvider router={router} />
}

export default Routes
