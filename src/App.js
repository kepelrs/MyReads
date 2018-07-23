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
    this.fetchShelves();
  }

  fetchShelves = () => {
    BooksAPI.getAll()
    .then((books) => this.setState({
      currentlyReading: books.filter(book=>book.shelf === "currentlyReading"),
      wantToRead: books.filter(book=>book.shelf === "wantToRead"),
      read: books.filter(book=>book.shelf === "read"),
    }))
  }

  changeShelf = (book, shelf)=> {
    // Update state
    this.setState(state=>{
      const newState = {}
      // Remove book from old shelf
      newState[book.shelf] = state[book.shelf].filter(target=>target!==book)
      // Place book in new shelf
      book.shelf = shelf
      newState[shelf] = state[shelf].concat([book])
      return newState
    })

    // Sync changes with server
    BooksAPI.update(book, shelf)
    .then(this.fetchShelves)
  }

  searchBooks = (query) => {
    // Display nothing when query is empty
    if(!query) {
      this.setState({queryResults: []})
    } else {
      BooksAPI.search(query)
      .then(results=>this.setState({
        // Handle invalid queries and categorize valid results
        queryResults: results.error ? [] : this.categorizeQueries(results)
      }))
    }
  }

  categorizeQueries = (bookArray) => {
    const currentlyReadingIds = this.state.currentlyReading.map(book=>book.id)
    const wantToReadIds = this.state.wantToRead.map(book=>book.id)
    const readIds = this.state.read.map(book=>book.id)

    // Check and assign the appropriate shelf property to queried books
    return bookArray.map((book) => {
      if(currentlyReadingIds.indexOf(book.id) !== -1){
        book.shelf='currentlyReading'
      }else if(wantToReadIds.indexOf(book.id) !== -1){
        book.shelf='wantToRead'
      }else if(readIds.indexOf(book.id) !== -1){
        book.shelf='read'
      }else {
        book.shelf='none'
      }
      return book
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=> (
          <MainPage
            currentlyReading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            read={this.state.read}
            changeShelf={this.changeShelf}
          />)}
        />
        <Route path="/search" render={()=> (
          <SearchPage
            queryApi={this.searchBooks}
            bookMatches={this.state.queryResults}
            changeShelf={this.changeShelf}
          />)}
        />
      </div>
    )
  }
}

export default BooksApp
