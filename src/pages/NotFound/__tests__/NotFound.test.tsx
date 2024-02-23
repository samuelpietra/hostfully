import { useNavigate } from 'react-router-dom'

import { render, screen, userEvent } from '@/testUtils'

import NotFoundPage from '../NotFound'

describe('NotFoundPage', () => {
  test('SHOULD render correctly', async () => {
    render(<NotFoundPage />, { route: 'not-found' })

    const stateMessage = {
      icon: screen.getByLabelText('StateIcon'),
      title: screen.getByText('404 - Not Found'),
      subtitle: screen.getByText('Make sure page exists.'),
      button: screen.getByRole('button', { name: 'Back to home' })
    }

    for (const element of Object.values(stateMessage)) expect(element).toBeInTheDocument()

    await userEvent.click(stateMessage.button)

    expect(useNavigate()).toBeCalledWith('/')
  })
})
