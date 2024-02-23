import { lazy, Suspense } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import { Layout } from '@/components/Layout'
import { LoadingContainer } from '@/components/LoadingContainer'
import { IRoute, RoutesCreator } from '@/RoutesCreator'

const HomePage = lazy(() => import('@/pages/Home'))
const SandboxPage = lazy(() => import('@/pages/Sandbox'))

const ROUTES: IRoute[] = [
  {
    element: <HomePage />,
    path: '/'
  },
  {
    element: <SandboxPage />,
    path: '/sandbox'
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
