import { configureStore } from '@reduxjs/toolkit'
import counter from '../features/counter/counter-slice'
import { apiSlice } from '../features/dogs/dogs-api-slice'
import { booksSlice } from '../features/books/books.slice'

export const store = configureStore({
  reducer: {
    counter,
    [apiSlice.reducerPath]: apiSlice.reducer,
    books: booksSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
