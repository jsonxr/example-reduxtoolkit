/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { Link } from 'react-router-dom'
import { Book } from './Book.model'
import useBooks from './books.hook'

const getMax = (a: number, b: number): number => Math.max(a, b)

export const BooksView = () => {
  console.log('BooksView')
  const books = useBooks()
  const all = books.useAll()
  const book = books.useBook(3)

  const onAddBook = () => {
    const max: number = all.map((b) => b.id).reduce(getMax, 0)
    books.add({
      id: max + 1,
      title: `book ${max + 1}`,
    })
  }

  const onDelete = () => {
    books.remove(all.length)
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <div style={{ flex: 1 }}>count: {all.length}</div>
          <div style={{ flex: 1 }}>
            Selected: {book?.id} - {book?.title}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <div style={{ flex: 1 }}>
            <button onClick={onAddBook}>Add</button>
          </div>
          <div style={{ flex: 1 }}>
            <button onClick={onDelete}>Delete</button>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>title</th>
          </tr>
        </thead>
        <tbody>
          {all.map((b: Book) => (
            <tr key={b.id}>
              <td>
                <Link to={`/books/${b.id}`}>{b.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
