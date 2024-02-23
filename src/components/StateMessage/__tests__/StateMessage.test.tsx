import { render, screen, userEvent } from '@/testUtils'

import { State, StateMessage, StateMessageProps } from '../StateMessage'

const setup = ({ type, ...props }: StateMessageProps) => {
  render(<StateMessage type={type} {...props} />)

  return {
    icon: screen.getByLabelText('StateIcon'),
    title: screen.queryByText(type === 'empty' ? 'Nothing to show' : 'Something broke')
  }
}

describe('StateMessage', () => {
  test.each<[State]>([['empty'], ['error']])('WHEN type=%s SHOULD render correctly', (type) => {
    const { icon, title } = setup({ type })

    expect(icon).toBeInTheDocument()
    expect(title).toBeInTheDocument()
  })

  test('WHEN passed custom iconColor, title AND subtitle SHOULD render correctly', () => {
    const iconColor = '#10ab10'
    const title = 'Some title'
    const subtitle = 'Some description'

    const { icon } = setup({ type: 'empty', iconColor, title: 'Some title', subtitle })

    expect(icon).toHaveStyle({ color: iconColor })
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(subtitle)).toBeInTheDocument()
  })

  test('WHEN passed custom button props SHOULD render AND behave correctly', async () => {
    const buttonLabel = 'Press to retry'
    const mockButtonAction = vi.fn()

    setup({ type: 'error', buttonAction: mockButtonAction, buttonLabel })

    await userEvent.click(screen.getByRole('button', { name: buttonLabel }))

    expect(mockButtonAction).toBeCalled()
  })
})
