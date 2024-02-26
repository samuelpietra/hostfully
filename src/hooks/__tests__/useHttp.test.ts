import { act, renderHook } from '@testing-library/react-hooks'
import { Mocked } from 'vitest'

import useHttp from '@/hooks/useHttp'
import http from '@/services/http'

vi.mock('@/services/http')

const mockHttp = http as Mocked<typeof http>

describe('useHttp', () => {
  test('WHEN stated isLoading SHOULD be false', async () => {
    const { result } = renderHook(() => useHttp('get', 'url'))

    expect(result.current.isLoading).toBeFalsy()
  })

  test('WHEN request return success SHOULD return true, set payload data and set loading false', async () => {
    const data = { id: 10 }

    mockHttp.get.mockResolvedValue({ data })

    const { result } = renderHook(() => useHttp('get', 'url'))

    let response
    await act(async () => {
      response = await result.current.request()
    })

    expect(response).toEqual({ payload: data })
    expect(result.current.isLoading).toBeFalsy()
  })

  test('WHEN request return error SHOULD return false, set error and set loading false', async () => {
    const mockError = new Error()
    mockHttp.get.mockRejectedValue(mockError)

    const { result } = renderHook(() => useHttp('get', 'url'))

    let response
    await act(async () => {
      response = await result.current.request()
    })

    expect(response).toEqual({ error: mockError, payload: undefined })
    expect(result.current.isLoading).toBeFalsy()
  })
})
