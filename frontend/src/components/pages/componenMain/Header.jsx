import React, { useState } from "react";
import "./style/header.css"
import LoginModal from "./modal/LoginModal.jsx"
import RegisterModal from "./modal/RegisterModal.jsx";

const Header = () => {
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);


    return (
        <>
            <div className="header-container">
                <button className="button-two" onClick={() => setLoginModalOpen(true)}>Войти</button>
                <LoginModal
                    isOpen={loginModalOpen}
                    onClose={() => setLoginModalOpen(false)}
                    onRegister={() => setRegisterModalOpen(true)}
                />

                <RegisterModal
                    isOpen={registerModalOpen}
                    onClose={() => setRegisterModalOpen(false)}
                />
                <a className="logo" href="">ЛОГО</a>
                <ul className="nav">
                    <li>Библиотеки</li>
                    <li>О нас</li>
                    <li>Контакты</li>
                </ul>
            </div>
        </>
    )
}

export default Header;