import { render, screen } from '@/testUtils'

import { Column } from '../Column'

describe('Column', () => {
  test('SHOULD render correctly', () => {
    render(<Column>something</Column>)

    expect(screen.getByText('something')).toBeInTheDocument()
  })

  test('SHOULD render with style props', () => {
    render(<Column color="#800">red text</Column>)

    const redText = screen.getByText('red text')

    expect(redText).toBeInTheDocument()
    expect(redText).toHaveStyle('color: #800')
  })
})
