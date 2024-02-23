import { render, screen } from '@/testUtils'

import { LoadingContainer } from '../LoadingContainer'

describe('LoadingContainer', () => {
  test('SHOULD render StateMessage', () => {
    render(<LoadingContainer />)

    expect(screen.getByTestId('loading-container')).toBeInTheDocument()
  })

  test('WHEN has loadingText prop SHOULD render displaying text', () => {
    const loadingText = 'Legen - wait for it - dary!'

    render(<LoadingContainer title={loadingText} />)

    expect(screen.getByTestId('loading-container')).toBeInTheDocument()
    expect(screen.getByText(loadingText)).toBeInTheDocument()
  })
})
