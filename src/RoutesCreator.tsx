import { Route, Routes } from 'react-router'

import NotFoundPage from '@/pages/NotFound'

interface IRoute {
  element: JSX.Element
  path: string
}

const RoutesCreator = ({ routes }: { routes: IRoute[] }) => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} {...route} />
      ))}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export type { IRoute }
export { RoutesCreator }
