import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Counter } from './features/counter/Counter'
import { Dogs } from './features/dogs/Dogs'
import { BooksView } from './features/books/Books.view'
import { BookView } from './features/books/Book.view'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <img src={logo} className="App-logo" alt="logo" />
          <p>Hello Vite + React!</p>
          <nav>
            <ul>
              <li>
                <Link to="/books">Books</Link>
              </li>
              <li>
                <Link to="/counter">Counter</Link>
              </li>
              <li>
                <Link to="/dogs">Dogs</Link>
              </li>
            </ul>
          </nav>
        </header>
        <div style={{ flex: 1 }}>
          <Switch>
            <Route exact path="/books" component={BooksView} />
            <Route exact path="/books/:id" component={BookView} />
            <Route exact path="/counter" component={Counter} />
            <Route exact path="/dogs" component={Dogs} />
            <Route exact path="/">
              <Redirect to="/books" />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
