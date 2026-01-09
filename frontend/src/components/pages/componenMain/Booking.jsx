import React, { useState, useEffect } from "react";

const API_URL = process.env.API_URL;

const Booking = ({ bookId }) => {
  const [book, setBook] = useState(null);
  const [libraries, setLibraries] = useState([])

  useEffect(() => {
    fetch(`${API_URL}/api/books/${bookId} `)
      .then((res) => res.json())
      .then((data) => {
        setBook(data.book); 
        setLibraries(data.library);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!book) {
    return <div>Загрузка</div>;
  }

  if(!libraries) {
    return <div>Загрузка</div>
  }

  console.log(book);
  console.log(libraries)
  return (
    <>
      <h2>Бронирование книги «{book.title}»</h2>
      <div className="books book-item" >
        <div className="desc-book">
          <img className="img-book" src={book.coverImage} alt={book.title} />
          <div className="text-container">
            <h3>{book.title}</h3>
            <p className="text-books">
              <span className="gray-text">Автор:</span> {book.author}
            </p>
            <p className="text-books">
              <span className="gray-text">Год:</span> {book.year}
            </p>
            <p className="text-books">
              <span className="gray-text">Описание:</span>
              <br />
              {book.description}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2>Выберите библиотеку</h2>
        {libraries.map(library => (
          <div key={library.id}>
          <h3>{library.name}</h3>
          <p>ул.{library.address}</p>
          
          </div>
        ))}
      </div>
    </>
  );
};

export default Booking;
