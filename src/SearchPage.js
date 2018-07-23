import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class SearchPage extends Component{
  state = {query: ''}

  findBooks = (event) => {
    const query = event.target.value
    this.setState({query})
    this.props.searchApi(query)
  }

  render() {
    return (
      <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.findBooks}/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {this.props.bookMatches.map && this.props.bookMatches.map(book=>(
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 190,backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                  <div className="book-shelf-changer">
                    <select defaultValue={this.props.defaultSelection} onChange={(event)=>this.shelfWasChanged(event, book)}>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                {/* {book.authors.map((author, index)=>(
                  <div key={index} className="book-authors">{author}</div>
                ))} */}
              </div>
            </li>
          ))}
        </ol>
      </div>
      </div>
    )
  }
}

export default SearchPage;
