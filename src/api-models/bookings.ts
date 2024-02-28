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

namespace GetBookingDetailsAPI {
  export interface GetResponse {
    id: string
    customer: {
      document: string
      name: string
      phone: string
    }
    checkInAt: string
    checkOutAt: string
    createdAt: string
    updatedAt: string
  }

  export type RequestParams = APIRequestParams<{
    urlParams: {
      id: string
    }
  }>
}

namespace DeleteBookingAPI {
  export type RequestParams = APIRequestParams<{
    urlParams: {
      id: string
    }
  }>
}

export type { ListBookingsAPI, GetBookingDetailsAPI, DeleteBookingAPI }
