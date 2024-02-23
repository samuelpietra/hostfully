import { render, screen } from '@/testUtils'

import SandboxPage from '../Sandbox'

describe('SandboxPage', () => {
  test('SHOULD render correctly', () => {
    render(<SandboxPage />)

    expect(screen.getByText('Sandbox')).toBeInTheDocument()
  })
})
