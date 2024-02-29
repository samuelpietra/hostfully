import { render, screen, userEvent } from '@/testUtils'

import { TopBar } from '../TopBar'

const setup = () => {
  render(<TopBar />)

  return {
    logo: screen.getByRole('img'),
    githubButton: screen.getByRole('button', { name: 'FaGithub' })
  }
}

describe('TopBar', () => {
  test('SHOULD render correctly', () => {
    const { logo, githubButton } = setup()

    expect(screen.getByRole('banner')).toBeInTheDocument() // <header>
    expect(logo).toBeInTheDocument()
    expect(githubButton).toBeInTheDocument()
  })

  test('WHEN pressed GitHub button SHOULD open repository link', async () => {
    window.open = vi.fn()

    const { githubButton } = setup()

    await userEvent.click(githubButton)

    expect(window.open).toBeCalledWith('https://github.com/samuelpietra/hostfully', '_blank')
  })
})
