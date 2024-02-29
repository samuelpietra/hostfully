import responses from '@/pages/MyBookings/__fixtures__/responses'

import { useBookingsStore } from '../bookings'

describe('Bookings store', () => {
  afterAll(() => {
    useBookingsStore.destroy()
  })

  test('setStoredList', () => {
    const state = useBookingsStore.getState()

    expect(state.storedList).toBeUndefined()

    state.setStoredList(responses.withData)

    expect(useBookingsStore.getState().storedList).toStrictEqual(responses.withData)
  })

  test.todo('setStoredDetails')
  test.todo('reset')
})
