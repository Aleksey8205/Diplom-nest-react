import { useState } from "react";
import ReactModal from "react-modal";
import { X } from "lucide-react";

ReactModal.setAppElement("#root");

const API_URL = import.meta.env.VITE_API_URL ?? '';

interface IRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal = ({ isOpen, onClose }: IRegisterModalProps) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactPhone] = useState("default");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('')
    const registrationData = { email, password, name, contactPhone };
    
    fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
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
      .then(() => {
        onClose()
      })
      .catch((error) => {
        setMessage(error.message);
      });
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
      <div>
      <h2>Регистрация нового аккаунта</h2>
      <form className="autorization-modal" onSubmit={handleSubmit}>
        <label htmlFor="regUsername">
          <p>ФИО</p>
        </label>
        <input
          className="input"
          type="text"
          id="regUsername"
          placeholder="Иванов Иван Иванович"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="regEmail">
          <p>Почта</p>
        </label>
        <input
          className="input"
          type="email"
          id="regEmail"
          placeholder="ivanov@mail.com"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="regPassword">
          <p>Пароль</p>
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

        <p>{message}</p>

        <button className="button-one" style={{ width: "264px" }} type="submit">
          Зарегистрироваться
        </button>
      </form>
      </div>
    </ReactModal>
  );
};

export default RegisterModal;
