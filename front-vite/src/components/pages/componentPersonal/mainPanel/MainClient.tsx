import  { useState } from "react";
import SupportChat from "../modal/SupportChat";
import "../style/mainPanel.css";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";

// const API_URL = import.meta.env.VITE_API_URL ?? "";

const MainClient = () => {
  const [createModal, setCreateModal] = useState(false);

  return (
    <>
      <section>
        <h2 className="hello-panel">Добро пожаловать в личный кабинет!</h2>
        <div className="info-panel">
          <div className="info-item">
            <p>Вы забронировали книг</p>
            <p>сейчас у вас активных бронирования</p>
            <div className="flex">
              <button className="button-one">Перейти к броням</button>
              <Link className="button-two" to="/">
                Найти книгу
              </Link>
            </div>
          </div>
        </div>
      </section>
      <button className="button-one chat" onClick={() => setCreateModal(true)}>
      <MessageSquare />
            </button>
      <SupportChat
            isOpen={createModal}
            onClose={() => setCreateModal(false)}
          />
    </>
  );
};

export default MainClient;
