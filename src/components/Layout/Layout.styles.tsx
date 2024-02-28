import { CSSProperties } from 'react'

import styled from 'styled-components'

import { TOPBAR_HEIGHT } from './TopBar/TopBar.styles'

const SHEET_WIDTH = 1056

const Container = styled.main`
  background-color: #252931;
  display: flex;
  height: ${`calc(100vh - ${TOPBAR_HEIGHT}px)`};
  overflow: auto;
`

const PageContent = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  padding: 16px;
`

export type SheetProps = { width?: number; height?: string }

const Sheet = styled.div<SheetProps>`
  background-color: #2d313b;
  border-radius: 12px;
  border: 1px solid #333;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: ${({ height }) => height};
  min-width: ${({ width = SHEET_WIDTH }) => width}px;
  overflow: hidden;
  padding: 16px;
  width: ${({ width = SHEET_WIDTH }) => width}px;
`

const Content = styled.div.attrs({ className: 'scroll-auto-hide' })`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0 -16px;
  overflow: auto;
  padding: 16px;
`

const Footer = styled.footer<{ justifyContent?: CSSProperties['justifyContent'] }>`
  border-top: 1px solid #555;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: ${({ justifyContent = 'flex-start' }) => justifyContent};
  margin: 0px -16px;
  padding: 16px;
  padding-bottom: 0;
`

export { Container, Content, Footer, PageContent, Sheet }
