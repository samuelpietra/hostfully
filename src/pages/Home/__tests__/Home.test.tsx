import { render, screen } from '@/testUtils'

import HomePage from '../Home'

describe('HomePage', () => {
  test('SHOULD render correctly', () => {
    render(<HomePage />)

    const stateMessage = {
      icon: screen.getByLabelText('StateIcon'),
      title: screen.getByText('Hello World'),
      subtitle: screen.getByText('Nice to see you!')
    }

    expect(stateMessage.icon).toBeInTheDocument()
    expect(stateMessage.title).toBeInTheDocument()
  })
})
