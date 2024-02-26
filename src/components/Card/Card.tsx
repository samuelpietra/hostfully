import { CSSProperties, PropsWithChildren } from 'react'

import S from './Card.styles'

function Card({ children, ...style }: PropsWithChildren<CSSProperties>) {
  return <S.Section style={{ ...style }}>{children}</S.Section>
}

export { Card }
