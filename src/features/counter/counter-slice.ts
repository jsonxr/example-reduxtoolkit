import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 10,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    added(state, action: PayloadAction<number>) {
      state.value += action.payload
    },
    incremented(state) {
      state.value++
    },
  },
})

export const { added, incremented } = counterSlice.actions
export default counterSlice.reducer
