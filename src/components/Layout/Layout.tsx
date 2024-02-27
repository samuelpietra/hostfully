import { CSSProperties, PropsWithChildren } from 'react'

import { Column } from '../Column'
import * as S from './Layout.styles'
import { TopBar } from './TopBar'

const MIN_WIDTH = 1110

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: PropsWithChildren<LayoutProps>) {
  return (
    <>
      <TopBar />

      <S.Container>
        <S.PageContent>{children}</S.PageContent>
      </S.Container>
    </>
  )
}

const Screen = ({ children, ...props }: PropsWithChildren<CSSProperties>) => {
  return (
    <Column width="100%" {...props}>
      {children}
    </Column>
  )
}

const Sheet = ({ children, ...props }: PropsWithChildren<S.SheetProps>) => {
  return <S.Sheet {...props}>{children}</S.Sheet>
}

Layout.Content = S.Content
Layout.Footer = S.Footer
Layout.Screen = Screen
Layout.Sheet = Sheet
Layout.MIN_WIDTH = MIN_WIDTH

export { Layout }
