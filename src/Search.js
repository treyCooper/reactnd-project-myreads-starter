import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import ShelfChanger from './ShelfChanger.js'
import * as BooksAPI from './BooksAPI'

class Search extends Component {

  static propTypes = {
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired
}

state = {
  query: ''
}

updateQuery = (query) => {
this.setState({ query: query.trim() })
BooksAPI.search(query, 20).then(result => this.setState((state) => ({
  books: this.props.books.concat(result)

}))

)
}

clearQuery = () => {
this.setState({ query: '' })
}
  render(){
  console.log('APISearch-response', this.state.books);
const { books, moveBook }= this.props
const { query } = this.state
let showingBooks
if (query) {
  const match = new RegExp(escapeRegExp(this.state.query), 'i')
  showingBooks = this.state.books.filter((book) => match.test(book.title))
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
            <input type="text"
                   placeholder="Search by title or author"
                   value={this.state.query}
                   onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
        {showingBooks.length !== books.length && (
          <div className='showing-books'>
            <span>Now showing {showingBooks.length} of {books.length}</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
          )}
          <ol className="books-grid">
          {showingBooks.map((book) => (
          <li key={book.id}>
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
