import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Book, IBooking, Library } from "./interface/interface";
import "./style/booking.css";
import { BookCheck, CalendarIcon } from "lucide-react";
import type { RootState } from "../../../utils/interface";
import { useSelector } from "react-redux";
import MapLibrary from "./MapLibrary";
import Books from "../../../public/books.svg";
import { BookOpen, CalendarDays, MapPin } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL ?? "";

const Booking = ({ bookItem }: IBooking) => {
  const [book, setBook] = useState<Book | null>();
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [selectedLibrary, setSelectedLibrary] = useState<Library | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const user = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (bookItem) {
      setBook(bookItem);
      fetch(
        `${API_URL}/api/books?title=${bookItem.title}&author=${bookItem.author}&isAvailable=true`
      )
        .then((res) => res.json())
        .then((data: Book[]) => {
          const uniqueLibraries = Array.from(
            new Set(data.map((b: Book) => b.library.id))
          ).map((libraryId) => {
            const relatedBook = data.find((b) => b.library.id === libraryId);
  
            return {
              ...relatedBook!.library, 
              availableCopies: relatedBook!.availableCopies, 
              totalCopies: relatedBook!.totalCopies, 
            };
          });
  
          setLibraries(uniqueLibraries);
        })
        .catch((err) => console.error(err));
    }
  }, [bookItem]);

  if (!book) {
    return <div>Загрузка</div>;
  }

  const handleSelectLibrary = (library: Library) => {
    setSelectedLibrary(library);
  };

  const handleChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(new Date(e.target.value));
  };

  const handleChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(new Date(e.target.value));
  };

  const handleRental = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user.user?.id) {
      setMessage("Не авторизован");
      return null;
    }

    const rentalData = {
      userId: user.user.id,
      libraryId: selectedLibrary?.id,
      bookId: book.id,
      dateStart: startDate,
      dateEnd: endDate,
    };
    console.log(rentalData);

    try {
      const response = await fetch(`${API_URL}/api/rentals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(rentalData),
      });

      if (!response.ok) {
        throw new Error("Ошибка сервера при создании бронирования.");
      }

      const result = await response.json();
      console.log("Данные успешно отправлены:");

      setShowForm(true);
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      setMessage("Возникла ошибка при бронировании. Повторите попытку позже.");
    }
  };

  return (
    <>
      {showForm ? (
        <>
          <h2 className="hello-panel">Бронирование успешно оформлено!</h2>
          <div className="flex">
            <img src={Books} alt="" />
            <div>
              <p>Книга будет ждать вас в выбранной библиотеке.</p>
              <div className="rental-item">
                <div className="flex">
                  <BookOpen color="#6AA378" />
                  <p>
                    {book.title} / {book.author}
                  </p>
                </div>
                <div className="flex">
                  <MapPin color="#6AA378" />
                  <p>
                    {selectedLibrary?.name} / {selectedLibrary?.address}
                  </p>
                </div>
                <div className="flex">
                  <CalendarDays color="#6AA378" />
                  <p>
                    Дата получения: {startDate?.toLocaleDateString()} / Дата
                    возврата: {endDate?.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p>
                Пожалуйста, заберите книгу в указанный срок. Если вы не успеете,
                бронь автоматически снимется
              </p>
              <div className="flex">
                <Link to="/" className="button-one">
                  Найди другую книгу
                </Link>
                <button className="button-two">Мои бронирования</button>
              </div>
            </div>
          </div>
          <MapLibrary />
        </>
      ) : (
        <form onSubmit={handleRental}>
          <div className="book_booking">
            <h2 className="hello-panel">Бронирование книги «{book.title}»</h2>
            <div className="books book-item">
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
                </div>
              </div>
            </div>

            <div>
              <h2>Выберите библиотеку</h2>
              <div className="booking-libaries">
                {libraries.length > 0 ? (
                  libraries.map((library, idx) => (
                    <div

                      className={`booking-library ${
                        selectedLibrary?.id === library.id && "active-library"
                      }`}
                      key={library.id}
                      onClick={() => handleSelectLibrary(library)}
                    >
                      <div className="library_title__address">
                        <p className="library-title">{library.name}</p>
                        <p>{library.address}</p>
                      </div>
                      <div className="book-check">
                        <BookCheck />
                        <p>
                        {library.availableCopies}/{library.totalCopies}
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
              <h2 className="hello-panel">Выберите период бронирования</h2>
              <CalendarIcon size={20} color="#6c757d" />
              <input
                type="date"
                required
                min={`${new Date().toISOString().split("T")[0]}`}
                value={startDate ? startDate.toISOString().split("T")[0] : ""}
                onChange={handleChangeStartDate}
              />{" "}
              —
              <input
                type="date"
                required
                min={`${new Date().toISOString().split("T")[0]}`}
                value={endDate ? endDate.toISOString().split("T")[0] : ""}
                onChange={handleChangeEndDate}
              />
            </div>
            <p>{message}</p>
            <button
              type="submit"
              className="button-one"
              disabled={!(selectedLibrary && startDate && endDate)}
            >
              Подтвердить Бронирование
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Booking;
