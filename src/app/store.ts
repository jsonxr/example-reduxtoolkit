import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createMigrate,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { encryptTransform } from 'redux-persist-transform-encrypt'

import counter from '../features/counter/counter-slice'
import { apiSlice } from '../features/dogs/dogs-api-slice'
import { slice as booksSlice, migrations as booksMigrations } from '../features/books/books.slice'

const encryption = false
const debug = true

function createReducer<T extends Reducer<any, any>>(key: string, version: number, reducer: T, migrations: any) {
  const transforms = []

  if (encryption) {
    transforms.push(
      encryptTransform({
        secretKey: 'my-super-secret-key',
        onError: function (error) {
          // Handle the error.
          console.error('hrmmm...', error)
        },
      })
    )
  }

  return persistReducer(
    {
      key,
      version,
      debug,
      storage,
      transforms,
      migrate: createMigrate(migrations, { debug }),
    },
    reducer
  ) as T
}

const rootReducer = combineReducers({
  counter,
  [apiSlice.reducerPath]: apiSlice.reducer,
  books: createReducer('books', 2, booksSlice.reducer, booksMigrations),
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // If this isn't here... "non-serializable value was detected in an action, in the path: `register`""
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
})
export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
