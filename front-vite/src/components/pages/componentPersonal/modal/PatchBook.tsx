import React, { useState, useEffect, useRef } from "react";
import ReactModal from "react-modal";
import "../../componenMain/style/modal.css";
import { X, Plus, Minus, Paperclip } from "lucide-react";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: number | undefined;
}

const API_URL = import.meta.env.VITE_API_URL ?? "";

const BookPatch = ({ isOpen, onClose, bookId }: IModalProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState<number>();
  const [description, setDescription] = useState("");
  const [totalCopies, setTotalCopies] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [coverImage, setCoverImage] = useState("")

  const previousIsOpen = useRef(isOpen);

  useEffect(() => {
    if (previousIsOpen.current === false && isOpen && bookId) {
      fetch(`${API_URL}/api/comon/books/${bookId}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setTitle(data.book.title);
          setAuthor(data.book.author);
          setYear(data.book.year);
          setDescription(data.book.description);
          setCoverImage(data.book.coverImage.split("/").pop())
          setTotalCopies(data.book.totalCopies);
        })
        .catch((error) => console.log(error));
    }

    previousIsOpen.current = isOpen;
  }, [isOpen, bookId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");

    const createData = { title, author, year, description, totalCopies };

    const formData = new FormData();
    if (selectedFile) {
      formData.append("coverImage", selectedFile);
    }

    Object.entries(createData).forEach(([key, value]) => {
      if (typeof value !== "undefined") {
        formData.append(key, value.toString());
      }
    });

    fetch(`${API_URL}/api/admin/books/${bookId}`, {
      method: "PATCH",
      credentials: "include",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 400 || !response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || `Ошибка ${response.status}`);
          });
        }
      })
      .then((result) => {
        setTitle("");
        setDescription("");
        setSelectedFile(null);
        onClose(); 
        console.log(result)
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  const increment = () => {
    setTotalCopies((prevCounter) => prevCounter + 1);
  };

  const decrement = () => {
    if (totalCopies > 0) {
      setTotalCopies((prevCounter) => prevCounter - 1);
    }
  };
  

  return (
    <>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={true}
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <button className="button-close" onClick={onClose}>
          <X />
        </button>
        <form className="autorization-modal" onSubmit={handleSubmit}>
          <h2 className="caption-modal">Редактировать книгу</h2>
          <div>
            <label htmlFor="Bookname">
              <p className="label-modal">Название</p>
            </label>
            <input
              className="input"
              type="text"
              id="Bookname"
              placeholder="Например, Братья Карамазовы"
              value={title}
           
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex">
            <div>
              <label htmlFor="author">
                <p className="label-modal">Автор</p>
              </label>
              <input
                className="input"
                type="text"
                id="author"
                placeholder="Например, Достоевский Ф.М."
          
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="year">
                <p className="label-modal">Год издания</p>
              </label>
              <input
                className="input"
                type="number"
                id="year"
                placeholder="Например, 1998"
           
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description">
              <p className="label-modal">Описание</p>
            </label>
            <textarea
              className="input textarea"
              id="description"
              placeholder="Добавьте описание"
              value={description}
         
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="counter-file">
            <div className="counter">
              <button
                className="pagination-arrow"
                type="button"
                disabled={totalCopies <= 0}
                onClick={decrement}
              >
                <Minus />
              </button>
              <p>{totalCopies}</p>
              <button
                className="pagination-arrow"
                type="button"
                onClick={increment}
              >
                <Plus />
              </button>
            </div>
            <div>
              <label className="file" htmlFor="file">
                <Paperclip />
                <p className="label-modal" style={{width: "200px"}}>{coverImage || "не загружено"}</p>
              </label>
              <input
                hidden
                id="file"
                type="file"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    setSelectedFile(files[0]);
                  } else {
                    setSelectedFile(null);
                  }
                }}
              />
            </div>
          </div>

          <div className="flex">
            <button
              className="button-one"
              style={{ width: "264px" }}
              onClick={onClose}
            >
              Отменить
            </button>
            <button
              className="button-two"
              style={{ width: "264px" }}
              type="submit"
            >
              Сохранить изменения
            </button>
          </div>
          <p>{message}</p>
        </form>
      </ReactModal>
    </>
  );
};

export default BookPatch;