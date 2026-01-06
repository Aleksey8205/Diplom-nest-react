import React, { useState } from "react";
import ReactModal from "react-modal";
import { useNavigate } from 'react-router-dom';
import "../style/modal.css"

ReactModal.setAppElement('#root');
const API_URL = process.env.API_URL;

const LoginModal = ({ isOpen, onClose, onRegister }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginData = {email, password}

    fetch(`${API_URL}/auth/login`,{         
      method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(loginData)
        })
            .then(response => response.json())
            .then(result => {
              console.log(result)
                onClose()
               navigate("/me")
            })
            .catch(error => {
                console.error('Error:', error);
            });
}

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      <h2>Вход в аккаунт</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Email</label>
        <input type="text" id="username" placeholder="Введите Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Пароль:</label>
        <input type="password" id="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Войти</button>
      </form>

      <a href="#" onClick={(event) => {
        event.preventDefault();
        onRegister();
      }}>
        Ещё нет аккаунта? Зарегистрироваться
      </a>

      <button onClick={onClose}>Закрыть</button>
    </ReactModal>
  );
};

export default LoginModal;