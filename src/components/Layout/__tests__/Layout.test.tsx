import { MemoryRouter } from 'react-router'

import { render, screen } from '@/testUtils'

import { Layout } from '../Layout'

describe('Layout', () => {
  test('SHOULD render complete layout', () => {
    render(
      <Layout>
        <Layout.Sheet>some content</Layout.Sheet>
      </Layout>,
      { wrapper: MemoryRouter }
    )

    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByText('some content')).toBeInTheDocument()

    // already fully tested at respective directories
    expect(screen.getByRole('banner')).toBeInTheDocument() // <header>
    expect(screen.getByRole('complementary')).toBeInTheDocument() // <aside>
  })
})
