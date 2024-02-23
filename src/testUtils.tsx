import { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'

import {
  RenderHookOptions,
  RenderOptions,
  render as rtlRender,
  renderHook as rtlRenderHook
} from '@testing-library/react'
import rtlUserEvent from '@testing-library/user-event'

interface CustomRenderOptions extends RenderOptions {
  route?: string
}

const render = (Element: ReactElement, { route = '/', ...options }: CustomRenderOptions = {}) => {
  window.history.pushState({}, 'Test page', route)

  return rtlRender(Element, { wrapper: BrowserRouter, ...options })
}

const renderHook = <TResult, TProps = unknown>(
  hookCall: (props: TProps) => TResult,
  options?: RenderHookOptions<TProps>
) => {
  return rtlRenderHook<TResult, TProps>(hookCall, { wrapper: BrowserRouter, ...options })
}

const userEvent = rtlUserEvent.setup({
  advanceTimers: vi.advanceTimersByTime,
  delay: null
})

export * from '@testing-library/react'
export * from 'vitest'
export { render, renderHook, userEvent }
