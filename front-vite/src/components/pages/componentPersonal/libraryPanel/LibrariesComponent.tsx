import { useState, useEffect } from "react";
import "../style/usersPanel.css";
import type { LibraryMap } from "../usersPanel/interface/interface";
import type { Book } from "../../componenMain/interface/interface";
import Pagination from "../usersPanel/Pagination";
import LibraryCreate from "../modal/CreateLibraryModal";

const API_URL = import.meta.env.VITE_API_URL ?? "";

const LibrariesComponent = () => {
  const [libraries, setLibraries] = useState<LibraryMap[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [createModal, setCreateModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const libraryPerPage = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetch(`${API_URL}/api/library`)
      .then((response) => response.json())
      .then((data) => setLibraries(data))
      .catch((error) => console.log(error));

    fetch(`${API_URL}/api/books`)
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.log(error));
  }, []);

  const bookInventory = (() => {
    const inventory: Record<string, { totalBooks: number, availableCopies: number }> = {};

    for (const book of books) {
      const libId = book.libraryId.toString();

      if (!inventory[libId]) {
        inventory[libId] = { totalBooks: 0, availableCopies: 0 };
      }

      inventory[libId].totalBooks += book.totalCopies;
      inventory[libId].availableCopies += book.availableCopies;
    }

    return inventory;
  })();

  const totalPages = Math.ceil(libraries.length / libraryPerPage);

  return (
    <>
      <section>
        <div className="head-panel">
          <h2 className="hello-panel">Библиотеки</h2>
          <button className="button-one" onClick={() => setCreateModal(true)}>
              Добавить библиотеку
            </button>
            <LibraryCreate
            isOpen={createModal}
            onClose={() => setCreateModal(false)}
          />
        </div>
        <div className="item-box">
          <div className="info_user_panel">
            <p className="gray-text">ID</p>
            <p className="gray-text" style={{ textAlign: "left" }}>
              Название Библиотеки
            </p>
            <p className="gray-text">Адрес</p>
            <p className="gray-text">Всего книг</p>
            <p className="gray-text">Доступно</p>
          </div>
          {libraries.map((library: LibraryMap) => (
            <div key={library.id} className="user-item">
              <p>{library.id}</p>
              <div className="user-information">
                <p>{library.name}</p>
              </div>
              <p>{library.address}</p>
              <p>{bookInventory[library.id]?.totalBooks || 0}</p>
              <p>{bookInventory[library.id]?.availableCopies || 0}</p>
            </div>
          ))}
        </div>
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </section>
    </>
  );
};

export default LibrariesComponent;