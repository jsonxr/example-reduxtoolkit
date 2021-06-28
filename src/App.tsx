import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Counter } from './features/counter/Counter'
import { Dogs } from './features/dogs/Dogs'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <Counter />
          <Dogs />
        </p>
      </header>
    </div>
  )
}

export default App
