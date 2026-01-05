import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const RegisterModal = ({ isOpen, onClose }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            shouldCloseOnOverlayClick={true}
            overlayClassName="modal-overlay"
            className="modal-content"
        >
            <h2>Регистрация нового аккаунта</h2>
            <form>
                <label htmlFor="regUsername">Имя пользователя:</label>
                <input type="text" id="regUsername" placeholder="Введите имя пользователя" />

                <label htmlFor="regPassword">Пароль:</label>
                <input type="password" id="regPassword" placeholder="Введите пароль" />

                <button type="submit">Зарегистрироваться</button>
            </form>

            <button onClick={onClose}>Закрыть</button>
        </ReactModal>
    );
};

export default RegisterModal;