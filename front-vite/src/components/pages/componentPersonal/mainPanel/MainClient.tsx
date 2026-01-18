// import  { useEffect, useState } from "react";
import "../style/mainPAnel.css";
import { Link } from "react-router-dom";

// const API_URL = import.meta.env.VITE_API_URL ?? "";

const MainClient = () => {
  

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
    </>
  );
};

export default MainClient;
