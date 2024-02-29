import { render, screen } from '@/testUtils'

import { Row } from '../Row'

describe('Row', () => {
  test('SHOULD render correctly', () => {
    render(<Row>something</Row>)

    expect(screen.getByText('something')).toBeInTheDocument()
  })

  test('SHOULD render with style props', () => {
    render(<Row color="#800">red text</Row>)

    const redText = screen.getByText('red text')

    expect(redText).toBeInTheDocument()
    expect(redText).toHaveStyle('color: #800')
  })
})
