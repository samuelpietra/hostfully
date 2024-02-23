import App from '@/App'
import { render, screen, waitFor } from '@/testUtils'

const MockRoute = (routeName: string) => () => <>{routeName}</>

const mockPages = {
  Sandbox: '/sandbox'
}

for (const mockPage of Object.keys(mockPages)) vi.doMock(`@/pages/${mockPage}`, () => MockRoute(mockPage))

describe('App', () => {
  test.each<[string, string]>(Object.entries({ ...mockPages }).map(([page, route]) => [route, page]))(
    'WHEN navigated to %s route SHOULD render %sPage',
    async (route, page) => {
      render(<App />, { route, wrapper: undefined })

      await waitFor(() => {
        expect(screen.getByText(page)).toBeInTheDocument()
      })
    }
  )
})
