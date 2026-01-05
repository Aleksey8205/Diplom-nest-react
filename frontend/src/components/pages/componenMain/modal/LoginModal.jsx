import React from "react";
import ReactModal from "react-modal";
import "../style/modal.css"

ReactModal.setAppElement('#root');

const LoginModal = ({ isOpen, onClose, onRegister }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      <h2>Вход в аккаунт</h2>
      <form>
        <label htmlFor="username">Имя пользователя:</label>
        <input type="text" id="username" placeholder="Введите имя пользователя" />

        <label htmlFor="password">Пароль:</label>
        <input type="password" id="password" placeholder="Введите пароль" />

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