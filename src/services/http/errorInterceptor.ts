import axios, { AxiosError } from 'axios'

import { HTTPStatusCode } from '@/constants/HTTPStatusCode'

type ApiErrorResponse = {
  title?: string
  detail?: string
  status?: number
}

type CustomAxiosError = AxiosError<ApiErrorResponse>

const errorInterceptor = (error: CustomAxiosError) => {
  if (axios.isCancel(error)) return Promise.reject(error)

  const { status = HTTPStatusCode.InternalServerError, data } = error?.['response'] ?? {}

  return Promise.reject({
    title: data?.['title'],
    detail: data?.['detail'] ?? 'Unexpected error occurred.',
    status: data?.['status'] ?? status
  })
}

export type { ApiErrorResponse, CustomAxiosError }
export { errorInterceptor }
