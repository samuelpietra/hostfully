import { render, screen } from '@/testUtils'

import { Container } from '../Container'

describe('Container', () => {
  test('SHOULD render correctly', () => {
    render(<Container />)

    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  test('SHOULD render with style props', () => {
    render(<Container backgroundColor="#000" width={100} />)

    const containerElement = screen.getByRole('main')

    expect(containerElement).toBeInTheDocument()
    expect(containerElement).toHaveStyle('background-color: #000; width: 100px')
  })
})
