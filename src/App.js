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
    this.fetchState();
  }

  fetchState = () => {
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
        queryResults: results.error ? [] : this.categorizeQueries(results)
      }))
    }
  }

  categorizeQueries = (bookArray) => {
    const currentlyReadingIds = this.state.currentlyReading.map(book=>book.id)
    const wantToReadIds = this.state.wantToRead.map(book=>book.id)
    const readIds = this.state.read.map(book=>book.id)

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
            changeShelf={(book, shelf)=>BooksAPI.update(book, shelf).then(this.fetchState)}
          />)}
        />
        <Route path="/search" render={()=> (
          <SearchPage
            queryApi={this.searchBooks}
            bookMatches={this.state.queryResults}
            changeShelf={(book, shelf)=>BooksAPI.update(book, shelf).then(this.fetchState)}
          />)}
        />
      </div>
    )
  }
}

export default BooksApp
