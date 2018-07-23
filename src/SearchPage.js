import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './Book';

class SearchPage extends Component{
  findBooks = (event) => {
    const query = event && event.target.value
    this.props.queryApi(query)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" onClick={()=>this.findBooks()}>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.findBooks}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.bookMatches.map(matchedBook=>(
              <Book key={matchedBook.id} book={matchedBook} changeShelf={this.props.changeShelf}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage;
