import { createSelector, createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit'
import { Book } from './Book.model'
import { AppState } from '../../app/store'

const booksAdapter = createEntityAdapter<Book>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (book) => book.id,
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.title.localeCompare(b.title),
})

type State = EntityState<Book> & {
  loading: 'idle' | 'pending'
}
const initialState: State = {
  loading: 'idle',
  ...booksAdapter.getInitialState(),
}

export const booksSlice = createSlice({
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
  ...booksSlice.actions,
}

const rootSelector = (state: AppState) => state.books
const booksSelectors = booksAdapter.getSelectors<AppState>(rootSelector)

export const selectors = {
  loading: createSelector(rootSelector, (state) => state.loading),
  all: booksSelectors.selectAll,
  byId: (id: number) => (state: AppState) => booksSelectors.selectById(state, id),
}
