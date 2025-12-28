import React from "react";
import "./style/header.css"

const Header = () => {

    return(
        <>
        <div className="header-container">
        <button className="button-two">Вход</button>
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