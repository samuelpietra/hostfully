import { useCallback, useState } from 'react'

import { ApiErrorResponse } from '@/services/http/errorInterceptor'

import useHttp, { HttpMethod, RequestConfig, RequestFn, RequestParams, RequestResult } from './useHttp'

function useHttpStateful<TPayload, TRequestParams extends RequestParams = RequestParams>(
  method: HttpMethod,
  url: string,
  config?: RequestConfig<TRequestParams>
) {
  const [payload, setPayload] = useState<TPayload | undefined>()
  const [error, setError] = useState<ApiErrorResponse>()

  const { isLoading, request: _request } = useHttp<TPayload, TRequestParams>(method, url, config)

  const clearError = useCallback(() => setError(undefined), [])

  const request: RequestFn<Promise<RequestResult<TPayload>>, TRequestParams> = useCallback(
    async (requestParams) => {
      setError(undefined)
      const { payload, error } = await _request(requestParams)
      setPayload(payload as TPayload)
      setError(error)
      return { payload, error }
    },
    [_request]
  )

  return {
    clearError,
    error,
    isLoading,
    payload,
    request,
  }
}

export default useHttpStateful
