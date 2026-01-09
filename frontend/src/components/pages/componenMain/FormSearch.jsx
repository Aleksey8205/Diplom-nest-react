import React, { useState } from "react";
import "./style/form.css";
import StackBooks2 from "../../../public/stack-of-books-2.svg";
import BooksEarth from "../../../public/books-2.svg"

const API_URL = process.env.API_URL;

const FormSearch = ({ onStartSearch, onStartBooking}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [booking, setIsBooking] = useState(false);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    onStartSearch(); 
    setIsSearching(true);
    try {
      const response = await fetch(`${API_URL}/api/books?title=${title}&author=${author}&isAvailable=true`);
      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error('Ошибка:', error);
    } 
  };

  const rental = (bookId) => {
    onStartBooking(bookId)
  };

  return (
    <>
      <div className="block-form">
        <form className="form-search" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title-input">
              <span className="label-input">Название:</span>
            </label>
            <input
              className="input"
              id="title-input"
              placeholder="Например, Евгений Онегин"
              type="text"
              name="bookTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="author-input">
              <span className="label-input">Автор:</span>
            </label>
            <input
              className="input"
              id="author-input"
              placeholder="Например, Пушкин А.С."
              type="text"
              name="authorName"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="block-date">
            <div className="date">
              <label htmlFor="issue-date">
                <span className="label-input">Выдача книги:</span>
              </label>
              <input
                className="input-date"
                id="issue-date"
                type="date"
                name="issueDate"
              />
            </div>
            <div className="date">
              <label htmlFor="return-date">
                <span className="label-input">Возврат книги:</span>
              </label>
              <input
                placeholder="выберите дату"
                className="input-date"
                id="return-date"
                type="date"
                name="returnDate"
              />
            </div>
          </div>
          <button type="submit" className="button-one">Найти книгу</button>
        </form>
        {!isSearching ? (
          <img src={StackBooks2} alt="" />
        ): (
          <img src={BooksEarth} alt="" />
        )}
        
      </div>
      {isSearching && (
      searchResults.length > 0 ? (
        <div className="search-results">
          <h2>Найдено: {searchResults.length} книги</h2>
          <div className="book-list">
          {searchResults.map((book, idx) => (
            <div className="books book-item" key={book.id}>
              <div className="desc-book">
                <img className="img-book" src={book.coverImage} alt={book.title} />
                <div className="text-container"> 
                  <h3>{book.title}</h3>
                  <p className="text-books"><span className="gray-text">Автор:</span> {book.author}</p>
                  <p className="text-books"><span className="gray-text">Год:</span> {book.year}</p>
                  <p className="text-books"><span className="gray-text">Описание:</span><br />{book.description}</p>
                  <p className="text-books"><span className="gray-text">Библиотека:</span><br />{book.library.name}</p>
                </div>
              </div>
              <button onClick={() => rental(book.id)} className="button-one">Забронировать</button>
            </div>
          ))}
          </div>
        </div>
      ) : (
        <>
        <h2>По вашему запросу ничего не найдено</h2>
        <p>К сожалению, по указанным данным книга не найдена. Проверьте правильность написания или попробуйте изменить параметры поиска (автор, название, дата).</p>
        </>
      ))}
    </>
  );
};

export default FormSearch;