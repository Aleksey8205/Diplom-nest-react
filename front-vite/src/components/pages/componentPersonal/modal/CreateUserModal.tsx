import React, { useState } from "react";
import ReactModal from "react-modal";
import "../../componenMain/style/modal.css";
import { X } from "lucide-react";

interface IUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const API_URL = import.meta.env.VITE_API_URL ?? '';

const UserCreate = ({ isOpen, onClose }: IUserModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [role, setRole] = useState('')
  const [message, setMessage] = useState("");


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setMessage('')
    const createData = { email, password, name, contactPhone, role}

    fetch(`${API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(createData)
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
      setMessage(result.message)
      setName('');
      setEmail('');
      setPassword('');
      setContactPhone('');
      setRole('')
    })
    .catch((error) => {
      setMessage(error.message);
    });


  }

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
          <h2 className="caption-modal">Добавить нового пользователя</h2>
          <div>
            <label htmlFor="username">
              <p className="label-modal">ФИО</p>
            </label>
            <input
              className="input"
              type="text"
              id="username"
              placeholder="Иванов Иван Иванович"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
          <label htmlFor="regPassword">
          <p className="label-modal">Пароль</p>
        </label>
        <input
          className="input"
          type="password"
          id="regPassword"
          placeholder="Введите пароль"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
          </div>

          <div className="flex">
            <div>
              <label htmlFor="tel">
                <p className="label-modal">Телефон</p>
              </label>
              <input
                className="input"
                type="tel"
                id="tel"
                placeholder="+79099999999"
                value={contactPhone}
                required
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">
                <p className="label-modal">Почта</p>
              </label>
              <input
                className="input"
                type="email"
                id="email"
                placeholder="ivanov@mail.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div >
            <p className="label-modal">Роль</p>
            <div className="flex">
            <div className="flex">
            <input className="radio-input" type="radio" name="role" id="client" value={'client'} onChange={(e) => setRole(e.target.value)}/>
            <label className="radio-label" htmlFor="client">
              <p className="label-modal">Клиент</p>
            </label>
            </div>
            <div className="flex">
            <input className="radio-input" type="radio" name="role" id="manager"  value={'manager'} onChange={(e) => setRole(e.target.value)}/>
            <label className="radio-label" htmlFor="manager">
              <p className="label-modal">Библиотекарь</p>
            </label>
            </div>
            <div className="flex">
            <input className="radio-input" type="radio" name="role" id="admin" value={'admin'} onChange={(e) => setRole(e.target.value)}/>
            <label className="radio-label" htmlFor="admin">
              <p className="label-modal">Администратор</p>
            </label>
            </div>
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
           Добавить пользователя
          </button>
          </div>
          <p>{message}</p>
        </form>
      </ReactModal>
    </>
  );
};

export default UserCreate;
