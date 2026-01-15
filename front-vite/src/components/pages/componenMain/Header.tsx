import  { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import type { RootState } from "../../../utils/interface";
import "./style/header.css";
import LoginModal from "./modal/LoginModal.jsx";
import RegisterModal from "./modal/RegisterModal.tsx";

const Header = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);


  const authState = useSelector((state: RootState) => state.auth);
  return (
    <>
      <div className="header-container">
        {!authState.authenticated ? (
          <button
            className="button-two"
            onClick={() => setLoginModalOpen(true)}
          >
            Войти
          </button>
        ) : (
          <>
            <Link className="button-two" to="/me">
              Войти в ЛК
            </Link>
          </>
        )}

        <LoginModal
          isOpen={loginModalOpen}
          onClose={() => setLoginModalOpen(false)}
          onRegister={() => setRegisterModalOpen(true)}
        />

        <RegisterModal
          isOpen={registerModalOpen}
          onClose={() => setRegisterModalOpen(false)}
        />

        <a className="logo" href="">
          ЛОГО
        </a>
        <ul className="nav">
          <li><a href="">Библиотеки</a></li>
          <li><a href="">О нас</a></li>
          <li><a href="">Контакты</a></li>
        </ul>
      </div>
    </>
  );
};

export default Header;
