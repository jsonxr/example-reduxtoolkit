import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Book } from './Book.model'
import { selectors, actions } from './books.slice'

export const useBooks = () => {
  const dispatch = useAppDispatch()

  const remove = useCallback(
    (id: number) => {
      dispatch(actions.loading('pending'))
      dispatch(actions.removeOne(id))
      dispatch(actions.loading('idle'))
    },
    [dispatch]
  )

  const add = useCallback(
    (book: Book) => {
      dispatch(actions.loading('pending'))
      dispatch(actions.addOne(book))
      dispatch(actions.loading('idle'))
    },
    [dispatch]
  )

  return {
    useAll: () => useAppSelector(selectors.all),
    useBook: (id: number) => useAppSelector(selectors.byId(id)),
    remove,
    add,
  }
}

export const useBook = (id: number) => {
  const books = useBooks()
  const book = books.useBook(id)

  return {
    book,
    remove: () => books.remove(id),
  }
}

export default useBooks
