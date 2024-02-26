import { useMemo } from 'react'

import '@testing-library/jest-dom'

const navigate = vi.fn()
const setSearchParams = vi.fn()

const mockNavigate = (url: string) => {
  window.history.pushState({}, 'Test page', url)
}

const useNavigate = () => {
  navigate.mockImplementation(mockNavigate)
  return navigate
}

const useSearchParams = () => {
  setSearchParams.mockImplementation((params) => {
    const searchParams = new URLSearchParams(params).toString()
    const url = `${window.location.pathname}?${searchParams}`
    mockNavigate(url)
  })

  return useMemo(() => [new URLSearchParams(window.location.search), setSearchParams], [])
}

beforeAll(() => {
  vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-router-dom')>()
    return {
      ...actual,
      useLocation: () => window.location,
      useNavigate,
      useParams: vi.fn(() => ({})),
      useSearchParams
    }
  })
})
