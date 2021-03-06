import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import ShelfChanger from './ShelfChanger.js'
import InputBoxDoneTyping from 'react-input-box-done-typing'

class Search extends Component{


  render(){

    const { searchResults } = this.props;
    searchResults.sort(sortBy('title'))

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
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
          <ol className="books-grid">
            {searchResults.map((book) => (
              <li key={book.id}>
              <div className="book">
                <div className="book-top">
                <div className='book-cover' style={{
                  backgroundImage:`url(${book.imageLinks.thumbnail})`
                  }}/>
                <ShelfChanger book={book} name={book.title} moveBook={this.props.moveBook}/>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors ? book.authors.join(', ') : ''} </div>
              </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  };
};
export default Search
