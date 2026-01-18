import { useState } from "react";
import "../componentPersonal/style/aside.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { logout } from "../../../utils/authSlice";
import { TabEnum } from "./interface/interface";
import { useDispatch } from "react-redux";
import MainComponent from "./mainPanel/MainComponent.tsx";
import UsersComponent from "./usersPanel/UsersComponent.tsx";

import { House } from "lucide-react";
import { UsersRound } from "lucide-react";
import { LibraryBig } from "lucide-react";
import { Settings } from "lucide-react";

import { useUser } from "./interface/UserContext.ts";

const API_URL = import.meta.env.VITE_API_URL ?? "";

const Aside = () => {
  const user = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState<TabEnum>(location.state?.tab || TabEnum.MAIN);

  const firstName = user ? user.name.split(" ")[1] : "";

  if (!user) {
    return <div>Загрузка...</div>;
  }

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
        dispatch(logout());
        navigate("/");
        console.log("Logout successful");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const handleTabClick = (tab: TabEnum) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <div className="panel">
        <aside className="aside">
          <div>
            {/* <img src="" alt="" /> */}
            <h2>Привет, {firstName} </h2>
            <p>{user.role}</p>
            <nav className="nav-profile">
              {user && user.role === "client" && (
                <>
                  <div className="item-nav">
                  <div
                      className={`nav-item ${
                        selectedTab === TabEnum.MAIN ? "active-link" : ""
                      }`}
                    >
                      <House />
                      <a onClick={() => handleTabClick(TabEnum.MAIN)}>
                        Главная
                      </a>
                    </div>
                    <div
                      className={`nav-item ${
                        selectedTab === TabEnum.BOOKS ? "active-link" : ""
                      }`}
                    >
                      <LibraryBig />
                      <a onClick={() => handleTabClick(TabEnum.BOOKS)}>
                        Мои книги
                      </a>
                    </div>
                    <div
                      className={`nav-item ${
                        selectedTab === TabEnum.SETTINGS ? "active-link" : ""
                      }`}
                    >
                      <Settings />
                      <a onClick={() => handleTabClick(TabEnum.SETTINGS)}>
                        Профиль
                      </a>
                    </div>
                  </div>
                </>
              )}
              {user && user.role === "manager" && (
                <>
                  <div className="item-nav">
                    <div
                      className={`nav-item ${
                        selectedTab === TabEnum.MAIN ? "active-link" : ""
                      }`}
                    >
                      <House />
                      <a onClick={() => handleTabClick(TabEnum.MAIN)}>
                        Главная
                      </a>
                    </div>
                    <div
                      className={`nav-item ${
                        selectedTab === TabEnum.USERS ? "active-link" : ""
                      }`}
                    >
                      <UsersRound />
                      <a onClick={() => handleTabClick(TabEnum.USERS)}>
                        Пользователи
                      </a>
                    </div>
                    <div
                      className={`nav-item ${
                        selectedTab === TabEnum.BOOKS ? "active-link" : ""
                      }`}
                    >
                      <LibraryBig />
                      <a onClick={() => handleTabClick(TabEnum.BOOKS)}>
                        Книги
                      </a>
                    </div>
                    <div
                      className={`nav-item ${
                        selectedTab === TabEnum.SETTINGS ? "active-link" : ""
                      }`}
                    >
                      <Settings />
                      <a onClick={() => handleTabClick(TabEnum.SETTINGS)}>
                        Настройки
                      </a>
                    </div>
                  </div>
                </>
              )}
              {user && user.role === "admin" && (
                <>
                  <div className="items-nav">
                    <div
                      className={`nav-item ${
                        selectedTab === TabEnum.MAIN ? "active-link" : ""
                      }`}
                    >
                      <House />
                      <a onClick={() => handleTabClick(TabEnum.MAIN)}>
                        Главная
                      </a>
                    </div>
                    <div
                      className={`nav-item ${
                        selectedTab === TabEnum.USERS ? "active-link" : ""
                      }`}
                    >
                      <UsersRound />
                      <a onClick={() => handleTabClick(TabEnum.USERS)}>
                        Пользователи
                      </a>
                    </div>
                    <div
                      className={`nav-item ${
                        selectedTab === TabEnum.LIBRARIES ? "active-link" : ""
                      }`}
                    >
                      <LibraryBig />
                      <a onClick={() => handleTabClick(TabEnum.LIBRARIES)}>
                        Библиотеки
                      </a>
                    </div>
                    <div
                      className={`nav-item ${
                        selectedTab === TabEnum.SETTINGS ? "active-link" : ""
                      }`}
                    >
                      <Settings />
                      <a onClick={() => handleTabClick(TabEnum.SETTINGS)}>
                        Настройки
                      </a>
                    </div>
                  </div>
                </>
              )}
            </nav>
          </div>
          <div className="logout">
            <a onClick={Logout}>Выход</a>
            <a className="logo" href="">
              ЛОГО
            </a>
          </div>
        </aside>

        <div className="content">
          {selectedTab === "main" && <MainComponent />}
          {selectedTab === "users" && <UsersComponent />}
          {/* {selectedTab === "libraries" && <LibrariesComponent />}
          {selectedTab === "books" && <BooksComponent />}
          {selectedTab === "settings" && <SettingsComponent />} */}
        </div>
      </div>
    </>
  );
};

export default Aside;
