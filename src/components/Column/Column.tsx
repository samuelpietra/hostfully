import { CSSProperties, PropsWithChildren } from 'react'

import S from './Column.styles'

function Column({ children, ...style }: PropsWithChildren<CSSProperties>) {
  return <S.Column style={{ ...style }}>{children}</S.Column>
}

export { Column }
