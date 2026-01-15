import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "";

const MainManager = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));

    // fetch(`${API_URL}/api/rentals`)
    //   .then((response) => response.json())
    //   .then((data) => setRentals(data))
    //   .catch((error) => console.log(error));

    fetch(`${API_URL}/api/books`)
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.log(error));
  }, []);

  const booksLength = books.length;
  const usersLength = users.length;

  return (
    <>
      <section>
        <h2 className="hello-panel">Добро пожаловать в админ-панель!</h2>
        <div className="info-panel">
          <div className="info-item">
            <p>Всего пользователей: {usersLength}</p>
            <p>С активными бронированиями </p>
            <p>Новых сообщений </p>
            <button className="button-one">Открыть список</button>
          </div>
          <div className="info-item">
            <p>Всего книг в системе: {booksLength}</p>
            <button className="button-one">Добавить книгу</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainManager;
