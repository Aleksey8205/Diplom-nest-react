import React, { useState } from "react";
import ReactModal from "react-modal";
import "../../componenMain/style/modal.css";
import { X } from "lucide-react";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const API_URL = import.meta.env.VITE_API_URL ?? "";

const LibraryCreate = ({ isOpen, onClose }: IModalProps) => {
  const [name, setName] = useState("");
  const [address, setAdress] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");
    const createData = { name, address, description };

    fetch(`${API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(createData),
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
        setMessage(result.message);
        setName("");
        setAdress("");
        setDescription("");
      })
      .catch((error) => {
        setMessage(error.message);
      });
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
          <h2 className="caption-modal">Добавить новую библиотеку</h2>
          <div>
            <label htmlFor="libraryname">
              <p className="label-modal">Название</p>
            </label>
            <input
              className="input"
              type="text"
              id="libraryname"
              placeholder="Например, Центральная городская"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="address">
              <p className="label-modal">Адрес</p>
            </label>
            <input
              className="input"
              type="text"
              id="address"
              placeholder="Например, ул. Бауманская д. 58/25"
              value={address}
              required
              onChange={(e) => setAdress(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="description">
              <p className="label-modal">Описание</p>
            </label>
            <textarea
              className="input textarea"
              
              id="description"
              placeholder="Например, Крупнейший центр чтения"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
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
              Добавить библиотеку
            </button>
          </div>
          <p>{message}</p>
        </form>
      </ReactModal>
    </>
  );
};

export default LibraryCreate;
