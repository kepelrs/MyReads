import React from 'react'
import { Route } from "react-router-dom";
import MainPage from './MainPage';
import SearchPage from './SearchPage';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    allBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      this.setState({ allBooks })
      console.log(allBooks)
    }).then(console.log(this.state.allBooks))
  }

  render() {
    return (
      <div className="app">
      <Route exact path="/" render={()=> (
        <MainPage
          currentlyReading={this.state.allBooks.filter(book=>book.shelf === "currentlyReading")}
          wantToRead={this.state.allBooks.filter(book=>book.shelf === "wantToRead")}
          read={this.state.allBooks.filter(book=>book.shelf === "read")}
        />)}
      />
      <Route path="/search" component={SearchPage}/>
      </div>
    )
  }
}

export default BooksApp
