import http from '@/services/http'
import { MockedFunction, render, screen, waitForElementToBeRemoved } from '@/testUtils'

import responses from '../__fixtures__/responses'
import MyBookingsPage from '../MyBookings'

vi.mock('@/services/http')

const mockGet = http.get as MockedFunction<typeof http.get>

const setup = () => {
  render(<MyBookingsPage />)

  return {
    pageTitle: screen.getByText('My bookings'),
    refreshButton: screen.getByRole('button', { name: 'IoMdRefresh' }),
    createButton: screen.getByRole('button', { name: 'FaPlus' })
  }
}

describe('MyBookingsPage', () => {
  test('SHOULD fetch available data AND render correctly', async () => {
    mockGet.mockResolvedValue({ data: responses.withData })

    const { pageTitle, refreshButton, createButton } = setup()

    expect(pageTitle).toBeInTheDocument()
    expect(refreshButton).toBeInTheDocument()
    expect(createButton).toBeInTheDocument()

    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-container'))

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('03/10/2024, 6:00 AM')).toBeInTheDocument()
    expect(screen.getByText('03/04/2024, 11:00 AM')).toBeInTheDocument()

    expect(screen.getByText('Foo Bar')).toBeInTheDocument()
    expect(screen.getByText('03/02/2024, 9:00 AM')).toBeInTheDocument()
    expect(screen.getByText('03/04/2024, 7:30 AM')).toBeInTheDocument()
  })

  test.todo('SHOULD fail to fetch data AND display StateMessage with error')
})
