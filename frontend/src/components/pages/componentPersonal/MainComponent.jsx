import React, { useEffect, useState } from "react";

const API_URL = process.env.API_URL;

const MainComponent = () => {
  const [library, setLibrary] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/library`)
      .then((response) => response.json())
      .then((data) => setLibrary(data))
      .catch((error) => console.log(error));

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

  const libraryLength = library.length;
  const booksLength = books.length;
  const usersLength = users.length;

  return (
    <>
      <section>
        <h2>Добро пожаловать в админ-панель!</h2>
        <div>
            <p>Всего библиотек{libraryLength}</p>
        </div>
        <div>
            <p>Всего пользователей{usersLength}</p>
        </div>
        <div>
            <p>Всего книг в системе: {booksLength}</p>
        </div>
      </section>
    </>
  );
};

export default MainComponent;
