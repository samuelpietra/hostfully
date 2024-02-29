import { ListBookingsAPI } from '@/api-models/bookings'

const emptyData: ListBookingsAPI.GetResponse = {
  totalCount: 0,
  items: []
}

const withData: ListBookingsAPI.GetResponse = {
  totalCount: 2,
  items: [
    {
      id: 'abc-111-def-111',
      customerName: 'John Doe',
      checkInAt: '2024-03-10T09:00:00.000Z',
      checkOutAt: '2024-03-04T14:00:00.000Z'
    },
    {
      id: 'abc-222-def-222',
      customerName: 'Foo Bar',
      checkInAt: '2024-03-02T12:00:00.000Z',
      checkOutAt: '2024-03-04T10:30:00.000Z'
    }
  ]
}

export default { emptyData, withData }
