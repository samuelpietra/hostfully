import { CSSProperties, PropsWithChildren } from 'react'

import S from './Container.styles'

interface ContainerProps extends CSSProperties {
  testID?: string
}

function Container({ children, testID, ...style }: PropsWithChildren<ContainerProps>) {
  return (
    <S.Main data-testid={testID} style={{ ...style }}>
      {children}
    </S.Main>
  )
}

export { Container }
