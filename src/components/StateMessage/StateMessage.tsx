import { PropsWithChildren, useMemo } from 'react'
import { FaRegGrin, FaRegTired } from 'react-icons/fa'
import { IconType } from 'react-icons/lib'

import { Button } from '@mui/material'

import { Column } from '../Column'
import S from './StateMessage.styles'

type State = 'empty' | 'error'

type StateContent = {
  [key in State]: {
    Icon: IconType
    title: string
  }
}

interface StateMessageProps {
  buttonAction?: () => void
  buttonLabel?: string
  iconColor?: string
  subtitle?: string
  title?: string
  type: State
}

const stateContent: StateContent = {
  empty: {
    Icon: FaRegGrin,
    title: 'Nothing to show'
  },
  error: {
    Icon: FaRegTired,
    title: 'Something broke'
  }
}

function StateMessage({
  buttonAction,
  buttonLabel,
  children,
  iconColor,
  subtitle,
  title,
  type
}: PropsWithChildren<StateMessageProps>) {
  const { Icon, title: defaultTitle } = useMemo(() => stateContent[type], [])

  return (
    <Column alignItems="center" justifyContent="center" flex={1}>
      <Icon aria-label="StateIcon" color={iconColor} style={{ marginBottom: 16 }} size={48} />

      <S.Title>{title ?? defaultTitle}</S.Title>

      {Boolean(subtitle) && <S.Subtitle>{subtitle}</S.Subtitle>}

      {Boolean(buttonAction) && (
        <Button onClick={buttonAction} style={{ marginTop: 20 }} variant="contained">
          {buttonLabel}
        </Button>
      )}

      {children}
    </Column>
  )
}

export type { State, StateMessageProps }
export { StateMessage }
