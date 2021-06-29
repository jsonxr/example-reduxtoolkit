import { createSelector, createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '../../app/store'
import { Book } from './Book.model'
import { createMigrations } from '../../app/Migrations'

const booksAdapter = createEntityAdapter<Book>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (book) => book.id,
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.title.localeCompare(b.title),
})

export type BooksState = EntityState<Book> & {
  loading?: 'idle' | 'pending'
  hello?: 'world' | 'migrated' | undefined
}

const initialState: BooksState = {
  // loading: 'idle',
  // hello: 'world',
  ...booksAdapter.getInitialState(),
}

export const slice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    loading(state, action: PayloadAction<'idle' | 'pending'>) {
      state.loading = action.payload
    },
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
    addOne: booksAdapter.addOne,
    removeOne: booksAdapter.removeOne,
    setAll(state, action: PayloadAction<{ books: Book[] }>) {
      // Or, call them as "mutating" helpers in a case reducer
      booksAdapter.setAll(state, action.payload.books)
    },
  },
})

export const actions = {
  ...slice.actions,
}

const rootSelector = (state: AppState) => state.books
const booksSelectors = booksAdapter.getSelectors<AppState>(rootSelector)

export const selectors = {
  loading: createSelector(rootSelector, (state) => state.loading),
  all: booksSelectors.selectAll,
  byId: (id: number) => (state: AppState) => booksSelectors.selectById(state, id),
}

export const migrations = createMigrations({
  0: (state: any) => ({ ...state, loading: 'idle' }),
  1: (state: any) => ({ ...state, hello: 'migrated' }),
  2: (state: any) => ({ ...state, whatabout: 'bob' }),
  3: (state: any) => ({ ...state, whatabout: 'bob 3' }),
  4: (state: any) => ({ ...state, whatabout: 'bob 4' }),
  5: (state: any) => ({ ...state, whatabout: 'bob 5' }),
})
