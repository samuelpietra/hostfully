import { APIPaginatedParams, APIPaginatedResponse, APIRequestParams } from '@/types/api'

namespace ListBookingsAPI {
  export type Item = {
    id: string
    customerName: string
    checkInAt: string
    checkOutAt: string
  }

  export type GetResponse = APIPaginatedResponse<Item>

  export type RequestParams = APIRequestParams<{
    params?: APIPaginatedParams
  }>
}

export type { ListBookingsAPI }
