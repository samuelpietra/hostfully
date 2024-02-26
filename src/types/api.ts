import { RequestParams } from '@/hooks/useHttp'

export type APIRequestParams<TRequestParams extends RequestParams> = Pick<TRequestParams, keyof TRequestParams>

export type APIPaginatedResponse<TItem> = {
  items: TItem[]
  totalCount: number
}

export type APIPaginatedParams = {
  page?: number
  take?: number
}
