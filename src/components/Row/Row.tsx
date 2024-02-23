import { CSSProperties, PropsWithChildren } from 'react'

import S from './Row.styles'

function Row({ children, ...style }: PropsWithChildren<CSSProperties>) {
  return <S.Article style={{ ...style }}>{children}</S.Article>
}

export { Row }
