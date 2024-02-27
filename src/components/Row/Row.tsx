import { CSSProperties, PropsWithChildren } from 'react'

import S from './Row.styles'

function Row({ children, ...style }: PropsWithChildren<CSSProperties>) {
  return <S.Row style={{ ...style }}>{children}</S.Row>
}

export { Row }
