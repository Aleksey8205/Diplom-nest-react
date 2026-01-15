import { useState, useEffect } from "react";
import type { Book, IBooking, Library } from "./interface/interface";
import "./style/booking.css"
import { BookCheck } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL ?? "";

const Booking = ({ bookItem }: IBooking ) => {
  const [book, setBook] = useState<Book | null>();
  const [libraries, setLibraries] = useState<Library[]>([]);

  useEffect(() => {
    if (bookItem) { 
      setBook(bookItem);
      fetch(
        `${API_URL}/api/books?title=${bookItem.title}&author=${bookItem.author}&isAvailable=true`
      )
        .then((res) => res.json())
        .then((data: Book[]) => {
          const uniqueLibraries = Array.from(new Set(data.map((b: Book) => b.library.id)))
            .map((libraryId) => data.find((b) => b.library.id === libraryId)!.library);
          setLibraries(uniqueLibraries);
        })
        .catch((err) => console.error(err));
    }
  }, [bookItem]);

  if (!book) {
    return <div>Загрузка</div>;
  }

  return (
    <>
      <h2>Бронирование книги «{book.title}»</h2>
      <div className="books book-item">
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
        <div className="booking-libaries">
        {libraries.length > 0 ? (
          libraries.map((library, idx) => (
            <div className="booking-library" key={idx}>
              <div className="library_title__address">
              <p className="library-title">{library.name}</p>
              <p>{library.address}</p>
              </div>
              <div className="book-check">
                <BookCheck />
              <p>
                {book.availableCopies}/{book.totalCopies}
              </p>
              </div>
            </div>
          ))
        ) : (
          <p>Нет доступных библиотек.</p>
        )}
        </div>
      </div>
      <div>
        <h2>Выберите период бронирования</h2>
        <input type="date" name="" id="" />
        <input type="date" name="" id="" />
      </div>
    </>
  );
};

export default Booking;