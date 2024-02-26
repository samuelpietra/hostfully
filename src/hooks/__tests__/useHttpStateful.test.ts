import { act, renderHook } from '@testing-library/react-hooks'
import { Mocked } from 'vitest'

import useHttpStateful from '@/hooks/useHttpStateful'
import http from '@/services/http'

vi.mock('@/services/http')

const mockHttp = http as Mocked<typeof http>

describe('useHttpStateful', () => {
  test('WHEN stated isLoading SHOULD be false', async () => {
    const { result } = renderHook(() => useHttpStateful('get', 'url'))

    expect(result.current.isLoading).toBeFalsy()
  })

  test('WHEN request return success SHOULD return true, set payload data and set loading false', async () => {
    const data = { id: 10 }
    mockHttp.get.mockResolvedValue({ data })

    const { result } = renderHook(() => useHttpStateful('get', 'url'))

    await act(result.current.request)

    expect(result.current.isLoading).toBeFalsy()
    expect(result.current.payload).toEqual(data)
  })

  test('WHEN request return error SHOULD return false, set error and set loading false', async () => {
    mockHttp.get.mockRejectedValue(new Error())

    const { result } = renderHook(() => useHttpStateful('get', 'url'))

    await act(result.current.request)

    expect(result.current.isLoading).toBeFalsy()
    expect(result.current.payload).toBeUndefined()
    expect(result.current.error).toBeTruthy()
  })
})
