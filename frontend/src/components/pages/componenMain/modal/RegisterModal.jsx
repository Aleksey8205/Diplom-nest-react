import React, { useState } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');
const API_URL = process.env.API_URL;

const RegisterModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contactPhone, setContactPhone] = useState('default')

    const handleSubmit = (event) => {
        event.preventDefault();
        const registrationData = { email, password, name, contactPhone };
        fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        })
            .then(response => response.json())
            .then(result => {
                onClose()
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
            <h2>Регистрация нового аккаунта</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="regUsername">ФИО</label>
                <input type="text" id="regUsername" placeholder="Иванов Иван Иванович" value={name}
                    onChange={(e) => setName(e.target.value)} />

                <label htmlFor="regEmail">Почта</label>
                <input type="email" id="regEmail" placeholder='ivanov@mail.com' value={email}
                    onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="regPassword">Пароль</label>
                <input type="password" id="regPassword" placeholder="Введите пароль" value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Зарегистрироваться</button>
            </form>

            <button onClick={onClose}>Закрыть</button>
        </ReactModal>
    );
};

export default RegisterModal;