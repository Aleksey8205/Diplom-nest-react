import { useState, useEffect } from "react";
import "../style/usersPanel.css";
import type { LibraryMap } from "../usersPanel/interface/interface";

const API_URL = import.meta.env.VITE_API_URL ?? "";

const LibrariesComponent = () => {
  const [libraries, setLibraries] = useState<LibraryMap[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/library`)
      .then((response) => response.json())
      .then((data) => setLibraries(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <section>
        <div className="head-panel">
          <h2 className="hello-panel">Библиотеки</h2>
        </div>
        <div className="item-box">
          <div className="info_user_panel">
          <p className="gray-text">ID</p>
            <p className="gray-text" style={{textAlign: "left"}}>Название Библиотеки</p>
            <p className="gray-text">Адрес</p>
            <p className="gray-text">Всего книг</p>
            <p className="gray-text">Доступно</p>
          </div>
          {libraries.map((library: LibraryMap, idx) => (
            <div key={idx} className="user-item">
                <p>{library.id}</p>
                <div className="user-information">
                <p>{library.name}</p>
                </div>
                <p>{library.address}</p>
                <p>всего</p>
                <p>доступно</p>
            </div>
        ))}
        </div>

      </section>
    </>
  );
};

export default LibrariesComponent;
