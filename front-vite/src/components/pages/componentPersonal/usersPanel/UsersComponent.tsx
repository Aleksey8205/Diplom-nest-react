import { useEffect, useState } from "react";
import { useUser } from "../interface/UserContext.ts";
import type { UserMap } from "./interface/interface.ts";
import "../style/usersPanel.css";
import UserCreate from "../modal/CreateUserModal.tsx";
import { BookOpen, ContactRound, MessageSquare, UserRound } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL ?? "";

const UsersComponent = () => {
  const user = useUser();
  const [users, setUsers] = useState<UserMap[]>([]);
  const [searchParam, setSearchParam] = useState("");
  const [createModal, setCreateModal] = useState(false);

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
            <button className="button-one" onClick={() => setCreateModal(true)}>
              Добавить пользователя
            </button>
          )}
          <UserCreate
            isOpen={createModal}
            onClose={() => setCreateModal(false)}
          />
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
            <p className="gray-text">ID</p>
            <p className="gray-text" style={{textAlign: "left"}}>ФИО/Контакты</p>

            <p className="gray-text">Последняя активность</p>
            <p className="gray-text">Активные брони</p>
            <p className="gray-text">Роль</p>
            <p className="gray-text">Чат</p>
          </div>
          {users.map((user: UserMap, idx) => (
            <div key={idx} className="user-item">
              <p>{user.id}</p>
              <div className="user-information">
                <p>{user.name}</p>
                <p className="gray-text">{user.contactPhone}</p>
                <p className="gray-text">{user.email}</p>
              </div>
              <p>актив</p>
              <p>бронь</p>
              {user.role === "client" ? (
                <p>
                  <UserRound />
                </p>
              ) : user.role === "manager" ? (
                <p>
                  <BookOpen />
                </p>
              ) : user.role === "admin" ? (
                <p>
                  <ContactRound />
                </p>
              ) : null}
              <p>
                <MessageSquare />
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default UsersComponent;
