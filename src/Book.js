import React, { Component } from 'react';

class Book extends Component {
  shelfWasChanged = (event, book) => {
    const newShelf = event.target.value
    this.props.changeShelf(book, newShelf)
  }

  render() {
    const book = this.props.book
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128,
              height: 190,
              backgroundImage: book.imageLinks && `url("${book.imageLinks.thumbnail}")`}}>
            </div>
            <div className="book-shelf-changer">
              <select defaultValue={book.shelf} onChange={(event)=>this.shelfWasChanged(event, book)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {book.authors && book.authors.map((author, index)=>(
            <div key={index} className="book-authors">{author}</div>
          ))}
        </div>
      </li>
    )
  }
}

export default Book;
