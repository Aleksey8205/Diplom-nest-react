import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginError } from '../../../../utils/authSlice.ts';
import { useNavigate } from 'react-router-dom';
import "../style/modal.css";
import { X } from "lucide-react";

ReactModal.setAppElement('#root');

const API_URL = import.meta.env.VITE_API_URL ?? '';

interface ILoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: () => void;
}

const LoginModal = ({ isOpen, onClose, onRegister }: ILoginModalProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `Ошибка ${response.status}`);
      }

      const result = await response.json();
      dispatch(loginSuccess(result.userData)); 
      onClose();
      navigate('/me');
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
        dispatch(loginError(error.message));
      }
    }
  };

  return (
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
        <h2 className="caption-modal">Вход</h2>
        <div>
          <label htmlFor="username">
            <p className="label-modal">Email</p>
          </label>
          <input
            className="input"
            type="text"
            id="username"
            placeholder="Введите Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">
            <p className="label-modal">Пароль</p>
          </label>
          <input
            className="input"
            type="password"
            id="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="button-one" style={{ width: '264px' }} type="submit">
          Войти
        </button>
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            onRegister();
          }}
          className="authorized"
        >
          Нет аккаунта? Зарегистрироваться
        </a>
        <p>{message}</p>
      </form>
    </ReactModal>
  );
};

export default LoginModal;