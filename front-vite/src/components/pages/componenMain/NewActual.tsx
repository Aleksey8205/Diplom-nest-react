import { useEffect, useState } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import "./style/actual.css";
import type { Book, IStartBooking } from "./interface/interface";

const API_URL = import.meta.env.VITE_API_URL ?? "";

const NewActual = ({ onStartBooking }: IStartBooking) => {
  const [books, setBooks] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/api/books`)
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.log(error));
  }, []);

  const nextPage = () => {
    if (activeIndex < books.length - 1) {
      setActiveIndex((prevIndex) => Math.min(prevIndex + 1, books.length - 1));
    }
  };

  const previousPage = () => {
    if (activeIndex > 0) {
      setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  if (!books || books.length === 0) {
    return <div>Нет книг</div>;
  }

  const rental = (bookItem: Book) => {
    onStartBooking(bookItem);
  };

  return (
    <>
      <h2>Новые поступления</h2>
      <div className="book-container">
        <div
          className="book-items-wrapper"
          style={{ transform: `translateX(-${activeIndex * 40}%)` }}
        >
          {Array.isArray(books) &&
            books.map((book: Book, idx) => (
              <div className="book-item" key={idx}>
                <div className="desc-book">
                  <img
                    className="img-book"
                    src={book.coverImage}
                    alt={book.title}
                  />
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
                    <p className="text-books">
                      <span className="gray-text">Библиотека:</span>
                      <br />
                      {book.library.name}
                    </p>
                  </div>
                </div>
                <button onClick={() => rental(book)} className="button-one">Забронировать</button>
              </div>
            ))}
        </div>
      </div>
      <div className="button-slider">
        <button className="arrow" onClick={previousPage}>
          <ArrowBigLeft />
        </button>
        <button className="arrow" onClick={nextPage}>
          <ArrowBigRight />
        </button>
      </div>
    </>
  );
};

export default NewActual;
