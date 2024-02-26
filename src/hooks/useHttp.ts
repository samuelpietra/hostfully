import { useCallback, useEffect, useRef, useState } from 'react'

import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios'

import http from '@/services/http'
import { ApiErrorResponse } from '@/services/http/errorInterceptor'

export type HttpMethod = 'get' | 'post' | 'delete' | 'put' | 'patch'

export interface RequestParams {
  body?: unknown
  params?: unknown
  urlParams?: unknown
}

export type RequestFn<T = unknown, TRequestParams extends RequestParams = RequestParams> = (
  requestParams?: TRequestParams
) => T

export interface RequestConfig<TRequestParams extends RequestParams> extends Omit<AxiosRequestConfig, 'params'> {
  params?: TRequestParams['params']
  urlParams?: TRequestParams['urlParams']
}

export interface RequestResult<TPayload> {
  payload?: TPayload
  error?: ApiErrorResponse
}

function useHttp<TPayload, TRequestParams extends RequestParams = RequestParams>(
  method: HttpMethod,
  url: string,
  config?: RequestConfig<TRequestParams>
) {
  const [isLoading, setIsLoading] = useState(false)
  const tokenRef = useRef<CancelTokenSource>()

  const request: RequestFn<Promise<RequestResult<TPayload>>, TRequestParams> = useCallback(
    async (requestParams) => {
      const result: RequestResult<TPayload> = {}

      setIsLoading(true)

      tokenRef.current?.cancel()
      tokenRef.current = axios.CancelToken.source()

      const _config = {
        ...(config ?? ({} as RequestConfig<TRequestParams>)),
        cancelToken: tokenRef.current.token,
      }

      if (requestParams?.params) _config.params = requestParams.params
      if (requestParams?.urlParams) _config.urlParams = requestParams.urlParams

      const _request = () => {
        if (['post', 'patch', 'put'].includes(method)) return http[method]<TPayload>(url, requestParams?.body, _config)
        return http[method]<TPayload>(url, _config)
      }

      try {
        result.payload = (await _request()).data
      } catch (error) {
        if (axios.isCancel(error)) return result

        result.error = error as ApiErrorResponse
      }

      setIsLoading(false)

      return result
    },
    [config, method, url]
  )

  useEffect(() => {
    return () => tokenRef.current?.cancel()
  }, [])

  return { isLoading, request }
}

export default useHttp
