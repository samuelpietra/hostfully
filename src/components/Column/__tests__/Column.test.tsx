import { render, screen } from '@/testUtils'

import { Column } from '../Column'

describe('Column', () => {
  test('SHOULD render correctly', () => {
    render(<Column />)

    expect(screen.getByRole('article')).toBeInTheDocument()
  })

  test('SHOULD render with style props', () => {
    render(<Column backgroundColor="#000" width={100} />)

    const columnElement = screen.getByRole('article')

    expect(columnElement).toBeInTheDocument()
    expect(columnElement).toHaveStyle('background-color: #000; width: 100px')
  })
})
