import { CSSProperties, PropsWithChildren } from 'react'

import S from './Column.styles'

function Column({ children, ...style }: PropsWithChildren<CSSProperties>) {
  return <S.Article style={{ ...style }}>{children}</S.Article>
}

export { Column }
