import { configureStore } from '@reduxjs/toolkit'
import counter from '../features/counter/counter-slice'

export const store = configureStore({
  reducer: {
    counter,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
