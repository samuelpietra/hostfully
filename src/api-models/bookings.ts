import { APIPaginatedParams, APIPaginatedResponse, APIRequestParams } from '@/types/api'

interface Booking {
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
  export interface GetResponse extends Booking {
    id: string
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

namespace CreateBookingAPI {
  export interface GetResponse {
    id: string
  }

  export type RequestParams = APIRequestParams<{
    body: Booking
  }>
}

namespace UpdateBookingAPI {
  export type RequestParams = APIRequestParams<{
    body: Omit<Booking, 'createdAt'>
  }>
}

export type { ListBookingsAPI, GetBookingDetailsAPI, DeleteBookingAPI, CreateBookingAPI, UpdateBookingAPI }
