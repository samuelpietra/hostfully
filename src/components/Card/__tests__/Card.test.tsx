import { render, screen } from '@/testUtils'

import { Card } from '../Card'

describe('Card', () => {
  test('SHOULD render correctly', () => {
    render(<Card>something</Card>)

    expect(screen.getByText('something')).toBeInTheDocument()
  })

  test('SHOULD render with style props', () => {
    render(<Card color="#800">red text</Card>)

    const redText = screen.getByText('red text')

    expect(redText).toBeInTheDocument()
    expect(redText).toHaveStyle('color: #800')
  })
})
