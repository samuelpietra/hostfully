import { render, screen } from '@/testUtils'

import { Row } from '../Row'

describe('Row', () => {
  test('SHOULD render correctly', () => {
    render(<Row />)

    expect(screen.getByRole('article')).toBeInTheDocument()
  })

  test('SHOULD render with style props', () => {
    render(<Row backgroundColor="#000" width={100} />)

    const rowElement = screen.getByRole('article')

    expect(rowElement).toBeInTheDocument()
    expect(rowElement).toHaveStyle('background-color: #000; width: 100px')
  })
})
