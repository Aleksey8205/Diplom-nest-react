import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./style/header.css"
import LoginModal from "./modal/LoginModal.jsx"
import RegisterModal from "./modal/RegisterModal.jsx";
import { checkAuth } from "../../../utils/checkAuth.js";

const Header = () => {
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        const initAuth = async () => {
            const authResult = await checkAuth();
            setIsAuthenticated(authResult);
        };

        initAuth();
    }, []);


    return (
        <>
            <div className="header-container">
                {!isAuthenticated ? (
                    <button className="button-two" onClick={() => setLoginModalOpen(true)}>Войти</button>
                ) : (
                    <>
                    <Link 
                    className="button-two"
                     to="/me">
                        <p>Войти в ЛК</p>
                   
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

                <a className="logo" href="">ЛОГО</a>
                <ul className="nav">
                    <li>Библиотеки</li>
                    <li>О нас</li>
                    <li>Контакты</li>
                </ul>
            </div>
        </>
    );
};

export default Header;