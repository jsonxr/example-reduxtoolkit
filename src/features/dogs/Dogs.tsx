import React, { useState } from 'react'
import { useFetchBreedsQuery } from './dogs-api-slice'

export const Dogs = () => {
  const [numDogs, setNumDogs] = useState(10)
  const { data = [], isFetching } = useFetchBreedsQuery(numDogs)

  return (
    <>
      <div>
        <p>Dogs to fetch:</p>
        <select value={numDogs} onChange={(e) => setNumDogs(Number(e.target.value))}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>

      {isFetching ? (
        <div>Fetching...</div>
      ) : (
        <div>
          <div>Number of dogs fetched: {data.length}</div>
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>picture</th>
              </tr>
            </thead>
            <tbody>
              {data.map((breed) => (
                <tr key={breed.id}>
                  <td>{breed.name}</td>
                  <td>
                    <img src={breed.image.url} height={250} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
