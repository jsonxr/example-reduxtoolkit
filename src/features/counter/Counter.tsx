import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { added } from './counter-slice'

export const Counter = () => {
  const value = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  const onClick = () => dispatch(added(2))

  return (
    <button type="button" onClick={onClick}>
      count is: {value}
    </button>
  )
}
