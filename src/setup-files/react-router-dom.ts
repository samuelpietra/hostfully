import '@testing-library/jest-dom'

const navigate = vi.fn()

const mockNavigate = (url: string) => {
  window.history.pushState({}, 'Test page', url)
}

const useNavigate = () => {
  navigate.mockImplementation(mockNavigate)
  return navigate
}

beforeAll(() => {
  vi.mock('react-router-dom', async (importOriginal) => {
    const mod = await importOriginal<typeof import('react-router-dom')>()
    return {
      ...mod,
      useLocation: () => window.location,
      useNavigate
    }
  })
})
