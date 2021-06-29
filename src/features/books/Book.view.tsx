import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useBook } from './books.hook'

export const BookView = () => {
  const params = useParams<{ id?: string }>()
  console.log('BookView', params.id)
  const id = Number(params.id ?? 0)
  const { goBack } = useHistory()
  const { book, remove } = useBook(Number(params.id))

  const onDelete = () => {
    remove()
    goBack()
  }

  if (id <= 0) {
    return <div>Invalid params.id</div>
  }

  if (!book) {
    return <div>Item removed</div>
  }

  return (
    <div>
      {book?.id} - {book?.title}
      <button onClick={onDelete}>Delete</button>
    </div>
  )
}
