import { create, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { GetBookingDetailsAPI, ListBookingsAPI } from '@/api-models/bookings'

type BookingDetails = GetBookingDetailsAPI.GetResponse
type BookingsList = ListBookingsAPI.GetResponse

interface BookingsState {
  storedDetails?: BookingDetails
  storedList?: BookingsList
}

interface BookingsActions {
  setStoredDetails: (details: BookingDetails) => void
  setStoredList: (list: BookingsList) => void
  reset: () => void
}

type BookingsStore = BookingsState & BookingsActions

const INITIAL_STATE: BookingsState = {
  storedDetails: undefined,
  storedList: undefined
}

const creator: StateCreator<BookingsStore> = (set) => ({
  ...INITIAL_STATE,
  setStoredDetails: (bookingDetails) => set({ storedDetails: bookingDetails }),
  setStoredList: (bookingsList) => set({ storedList: bookingsList }),
  reset: () => set(INITIAL_STATE)
})

const useBookingsStore = create<BookingsState & BookingsActions>()(
  devtools(persist(creator, { name: '@bookings', getStorage: () => localStorage }))
)

export { useBookingsStore }
