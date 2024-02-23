import { PropsWithChildren } from 'react'

import * as S from './Layout.styles'
import { TopBar } from './TopBar'

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

const Sheet = ({ children, ...props }: PropsWithChildren<S.SheetProps>) => {
  return <S.Sheet {...props}>{children}</S.Sheet>
}

Layout.Content = S.Content
Layout.Sheet = Sheet

export { Layout }
