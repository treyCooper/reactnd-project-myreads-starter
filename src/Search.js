import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import ShelfChanger from './ShelfChanger.js'
import InputBoxDoneTyping from 'react-input-box-done-typing'

class Search extends Component {

  static propTypes = {
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired
}


  render(){

  console.log('books', this.props.books);
const { books, moveBook, query }= this.props
let showingBooks

if (query) {
  const match = new RegExp(escapeRegExp(query), 'i')
  showingBooks = books.filter((book) => match.test(book.title || book.authors[0]))
} else {
  showingBooks = books;
}

showingBooks.sort(sortBy('title'))

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={this.props.toMainPage}>Close</a>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <InputBoxDoneTyping
                   type="text"
                   placeholder="Search by title or author"
                   doneTyping={(val) => this.props.updateSearch(val)}
                   doneTypingInterval={500}
            />
          </div>
        </div>
        <div className="search-books-results">
      {/*  {showingBooks.length !== books.length && (
          <div className='showing-books'>
            <span>Now showing {showingBooks.length} of {books.length}</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}*/}
          <ol className="books-grid">
          {showingBooks.map((book) => (
          <li key={book.id}>
          {console.log('showingbooks', showingBooks)}
          <div className="book">
            <div className="book-top">
            <div className='book-cover' style={{ width: 128, height: 193,
              backgroundImage:`url(${book.imageLinks.thumbnail})`
            }}/>
            <ShelfChanger book={book} name={book.title} moveBook={this.props.moveBook} />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors[0]} {book.authors[1]}</div>
          </div>
          </li>
          ))}
          </ol>
        </div>
      </div>
    )
  }
}
export default Search