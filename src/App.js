import React from 'react'
import { Route } from "react-router-dom";
import MainPage from './MainPage';
import SearchPage from './SearchPage';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    queryResults: []
  }

  componentDidMount() {
    this.refreshStateData();
  }

  refreshStateData = () => {
    BooksAPI.getAll().then((allBooks) => {
      this.setState({
        currentlyReading: allBooks.filter(book=>book.shelf === "currentlyReading"),
        wantToRead: allBooks.filter(book=>book.shelf === "wantToRead"),
        read: allBooks.filter(book=>book.shelf === "read"),
      })
      console.log(allBooks)
    })
  }

  searchBooks = (query) => {
    if(!query) {
      this.setState({queryResults: []})
    } else {
      BooksAPI.search(query)
      .then(results=>this.setState({
        queryResults: results.error ? [] : results
      }))
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=> (
          <MainPage
            currentlyReading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            read={this.state.read}
            changeShelf={(book, shelf)=>BooksAPI.update(book, shelf).then(this.refreshStateData)}
          />)}
        />
        <Route path="/search" render={()=> (
          <SearchPage
            queryApi={this.searchBooks}
            bookMatches={this.state.queryResults}
            changeShelf={(book, shelf)=>BooksAPI.update(book, shelf).then(this.refreshStateData)}
          />)}
        />
      </div>
    )
  }
}

export default BooksApp
