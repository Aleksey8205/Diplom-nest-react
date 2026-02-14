import { useEffect, useState } from "react";
import { LibraryMap } from "../usersPanel/interface/interface";
import "../style/infoLbraryPanel.css";
import type { Book } from "../../componenMain/interface/interface";
import BookCreate from "../modal/CreateBookModal";
import { Trash2, Pencil } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL ?? "";
import BookPatch from "./../modal/PatchBook";
import DeleteBook from "../modal/DeleteBook";

const InfoLibrary = ({ selectLibrary }: { selectLibrary?: LibraryMap }) => {
  const [library, setLibrary] = useState<LibraryMap | undefined>();
  const [books, setBooks] = useState<Book[] | undefined>([]);
  const [createModal, setCreateModal] = useState(false);
  const [patchBook, setPatchBook] = useState(false);
  const [deleteBook, setDeleteBook] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (selectLibrary) {
      fetch(`${API_URL}/api/comon/libraries/${selectLibrary.id}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setLibrary(data.library);
          setBooks(data.books);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  if (!books) {
    return null;
  }

  return (
    <>
      <div className="flex">
        <h2>{library?.name}</h2>
      </div>

      <div className="info-card">
        <h3>Информация</h3>
        <p>Название: {library?.name}</p>
        <p>Адрес: {library?.address}</p>
        <p>Описание: {library?.description}</p>
        <p>Всего книг: {books.length}</p>
        <p>Доступно книг: {books.filter((b) => b.availableCopies).length}</p>
        <div className="flex">
          <button type="button" className="button-one">
            Редактировать
          </button>
          <button
            type="button"
            className="button-one"
            style={{ background: "#FF4347" }}
          >
            Удалить библиотеку
          </button>
        </div>
      </div>

      <div className="books-search">
        <div className="flex">
          <p>Все</p>
          <p>Автор</p>
          <p>кол-во экземпляров</p>
        </div>
        <button className="button-one" onClick={() => setCreateModal(true)}>
          Добавить книгу
        </button>
      </div>
      <BookCreate
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        libraryId={library?.id}
      />

      <div className="item-box">
        <div className="info_library_panel">
          <p className="gray-text">ID</p>
          <p className="gray-text" style={{ textAlign: "left" }}>
            Название
          </p>
          <p className="gray-text">Автор</p>
          <p className="gray-text">Год</p>
          <p className="gray-text">Описание</p>
          <p className="gray-text">Кол-во экземпляров</p>
          <p className="gray-text">Действия</p>
        </div>

        {books.length > 0 ? (
          books.map((book) => (
            <>
              <div key={book.id} className="library-item">
                <p>{book.id}</p>
                <div className="user-information">
                  <p>{book.title}</p>
                </div>
                <p>{book.author}</p>
                <p>{book.year}</p>
                <p>{book.description}</p>
                <p>{book.totalCopies}</p>
                <div className="actions">
                  <Pencil
                    className="pencil"
                    onClick={() => {
                      setSelectedBookId(book.id);
                      setPatchBook(true);
                    }}
                  />
                  <Trash2
                    className="trash"
                    onClick={() => {
                      setDeleteBook(true);
                      setSelectedBookId(book.id);
                    }}
                  />
                </div>
              </div>
            </>
          ))
        ) : (
          <p>Книг нет</p>
        )}
      </div>

      <BookPatch
        isOpen={patchBook}
        onClose={() => setPatchBook(false)}
        bookId={selectedBookId}
      />
      <DeleteBook
        isOpen={deleteBook}
        onClose={() => setDeleteBook(false)}
        bookId={selectedBookId}
      />
    </>
  );
};

export default InfoLibrary;
