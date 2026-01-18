import { useEffect, useState } from "react";
import type { Rental } from "./interface";

import "../style/mainPAnel.css"

const API_URL = import.meta.env.VITE_API_URL ?? "";

const MainAdmin = () => {
  const [library, setLibrary] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [rental, setRental] = useState<Rental[]>([])

  useEffect(() => {
    fetch(`${API_URL}/api/library`)
      .then((response) => response.json())
      .then((data) => setLibrary(data))
      .catch((error) => console.log(error));

    fetch(`${API_URL}/api/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));

    fetch(`${API_URL}/api/rentals`)
      .then((response) => response.json())
      .then((data) => setRental(data))
      .catch((error) => console.log(error));

    fetch(`${API_URL}/api/books`)
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.log(error));
  }, []);

  const userIds = rental.map(rental => rental.userId);

  const uniqueUserIds = Array.from(new Set(userIds));
  

  

  const libraryLength = library.length;
  const booksLength = books.length;
  const usersLength = users.length;
  const usersRental = rental.length;
  const uniqueUsersCount = uniqueUserIds.length;

  return (
    <>
      <section>
        <h2 className="hello-panel">Добро пожаловать в админ-панель!</h2>
        <div className="info-panel">
          <div className="special-box">
          <div className="info-item">
            <p>Всего библиотек: {libraryLength}</p>
            <button className="button-one">Добавить библиотеку</button>
          </div>
          <div className="info-item">
            <p>Всего книг в системе: {booksLength}</p>
            <p>Активные бронирования: {usersRental}</p>
            <button className="button-one">Добавить книгу</button>
          </div>
          </div>
          <div className="info-item">
            <p>Всего пользователей: {usersLength}</p>
            <p>С активными бронированиями: {uniqueUsersCount}</p>
            <p>Новых сообщений:     </p>
            <button className="button-one">Открыть список</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainAdmin;
