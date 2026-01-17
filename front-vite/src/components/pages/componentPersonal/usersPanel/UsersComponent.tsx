import { useEffect, useState } from "react";
import { useUser } from "../interface/UserContext.ts";
import type { UserMap } from "./interface/interface.ts";
import "../style/usersPanel.css"

const API_URL = import.meta.env.VITE_API_URL ?? "";

const UsersComponent = () => {
  const user = useUser();
  const [users, setUsers] = useState([]);
  const [searchParam, setSearchParam] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    fetch(`${API_URL}/api/users?name=${searchParam}`);
  };

  return (
    <>
      <section>
        <div className="head-panel">
          <h2 className="hello-panel">Пользователи</h2>
          {user && user.role === "admin" && (
            <button className="button-one">Добавить пользователя</button>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
        </form>

        <div className="item-box">
          <div className="info_user_panel">
              <p>ID</p>
              <p>ФИО/Контакты</p>
              <p>Последняя активность</p>
              <p>Активные брони</p>
              <p>Роль</p>
              <p>Чат</p>     
            </div>    
          {users.map((users: UserMap, idx) => (
            <div key={idx} className="user-item">
            <p>{users.id}</p>
            <p>{users.name}</p>
            </div>
          ))}
          
        </div>
      </section>
    </>
  );
};

export default UsersComponent;
