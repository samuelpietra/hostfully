import axios, { AxiosRequestConfig } from 'axios'
import { MockedFunction } from 'vitest'

import { CustomAxiosError, errorInterceptor } from '@/services/http/errorInterceptor'

import { requestInterceptor } from '../http/requestInterceptor'

vi.mock('axios', async (importOriginal) => {
  const actual = await importOriginal<typeof import('axios')>()

  const mockAxios = vi.fn(() => ({
    interceptors: {
      response: { use: vi.fn() },
      request: { use: vi.fn() }
    }
  }))

  return {
    default: {
      ...actual,
      create: () => mockAxios,
      isCancel: vi.fn(() => false)
    }
  }
})

const mockIsCancel = axios.isCancel as unknown as MockedFunction<typeof axios.isCancel>

describe('http', () => {
  describe('Request interceptor', () => {
    test('WHEN call the request interceptor without url params SHOULD return the same config', async () => {
      const mockConfig = { url: 'test' } as AxiosRequestConfig

      expect(await requestInterceptor(mockConfig)).toStrictEqual(mockConfig)
    })

    test('WHEN call the request interceptor with url params SHOULD return the config with modified url', async () => {
      const mockConfig = { url: 'test/:id', urlParams: { id: 123 } } as AxiosRequestConfig

      expect(await requestInterceptor(mockConfig)).toStrictEqual({ ...mockConfig, url: 'test/123' })
    })
  })

  describe('Response error interceptor', () => {
    test('WHEN call errorInterceptor with error response SHOULD return error props', async () => {
      try {
        await errorInterceptor({
          response: {
            data: { detail: '503 - Service Unavailable' },
            status: 503
          }
        } as unknown as CustomAxiosError)
      } catch (errorResponse) {
        expect(errorResponse).toStrictEqual({
          detail: '503 - Service Unavailable',
          status: 503,
          title: undefined
        })
      }
    })

    test('WHEN call errorInterceptor with Cancel Error SHOULD throw a HttpCancelError', async () => {
      mockIsCancel.mockReturnValue(true)

      try {
        await errorInterceptor({} as CustomAxiosError)
      } catch (cancelError) {
        expect(cancelError).toBe(cancelError)
      }
    })
  })
})
