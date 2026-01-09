import React, { useState, useEffect } from "react";
import "../componentPersonal/style/aside.css";
import UsersComponent from "./UsersComponent.jsx";
import MainComponent from "./MainComponent.jsx";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.API_URL;

const Aside = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/auth/user-info`, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.log(error));
  }, []);

  if (!user || !user.name) {
    return <div>Загрузка...</div>;
  }

  const firstName = user.name.split(" ")[1];

  const Logout = () => {
    fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Logout failed");
        }
      })
      .then((data) => {
        navigate("/");
        console.log("Logout successful:");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <div className="panel">
        <aside className="aside">
          <img src="" alt="" />
          <h2>Привет, {firstName} </h2>
          <nav className="nav-profile">
            {user && user.role === "client" && (
              <>
                <div className="item-nav">
                  <button onClick={() => handleTabClick("main")}>
                    Главная
                  </button>
                  <button onClick={() => handleTabClick("books")}>
                    Мои Книги
                  </button>
                  <button onClick={() => handleTabClick("settings")}>
                    Настройки
                  </button>
                </div>
              </>
            )}
            {user && user.role === "manager" && (
              <>
                <div className="item-nav">
                  <button onClick={() => handleTabClick("main")}>
                    Главная
                  </button>
                  <button onClick={() => handleTabClick("users")}>
                    Пользователи
                  </button>
                  <button onClick={() => handleTabClick("books")}>Книги</button>
                  <button onClick={() => handleTabClick("settings")}>
                    Настройки
                  </button>
                </div>
              </>
            )}
            {user && user.role === "admin" && (
              <>
                <div className="item-nav">
                  <button onClick={() => handleTabClick("main")}>
                    Главная
                  </button>
                  <button onClick={() => handleTabClick("users")}>
                    Пользователи
                  </button>
                  <button onClick={() => handleTabClick("libraries")}>
                    Библиотеки
                  </button>
                  <button onClick={() => handleTabClick("settings")}>
                    Настройки
                  </button>
                </div>
              </>
            )}
            <button onClick={Logout}>Выход</button>
          </nav>
          <a className="logo" href="">
            ЛОГО
          </a>
        </aside>

        <div className="content">
          {selectedTab === "main" && <MainComponent />}
          {selectedTab === "users" && <UsersComponent />}
          {selectedTab === "libraries" && <LibrariesComponent />}
          {selectedTab === "books" && <BooksComponent />}
          {selectedTab === "settings" && <SettingsComponent />}
        </div>
      </div>
    </>
  );
};

export default Aside;
