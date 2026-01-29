import { useEffect, useState } from "react";
import { useUser } from "../interface/UserContext.ts";
import type { RentalMap, UserMap } from "./interface/interface.ts";
import "../style/usersPanel.css";
import UserCreate from "../modal/CreateUserModal.tsx";
import { BookOpen, ContactRound, MessageSquare, UserRound } from "lucide-react";
import Pagination from "./Pagination";
import SupportChat from "../modal/SupportChat.tsx";

const API_URL = import.meta.env.VITE_API_URL ?? "";

const UsersComponent = () => {
  const user = useUser();
  const [users, setUsers] = useState<UserMap[]>([]);
  const [rentals, setRentals] = useState<RentalMap[]>([]);
  const [searchParam, setSearchParam] = useState("");
  const [createModal, setCreateModal] = useState(false);

  const [chatModal, setChatModal] = useState(false);
  const [selectUser, setSelectUser] = useState<number>()

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/users`, { credentials: "include" }),
      fetch(`${API_URL}/api/rentals`, { credentials: "include" }),
    ])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then(([usersResponse, rentalsResponse]) => {
        setUsers(usersResponse);
        setRentals(rentalsResponse);
      })
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, []);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const reservationCount: Record<string, number> = {};

  for (const rental of rentals) {
    const userId = rental.userId.toString();
    reservationCount[userId] = (reservationCount[userId] || 0) + 1;
  }

  const lastActivityDate = (
    userId: number,
    rentals: RentalMap[]
  ): string | undefined => {
    const userRentals = rentals.filter((rental) => rental.userId === userId);

    const sortedRentals = userRentals.sort((a, b) => {
      const startA = new Date(a.dateStart).getTime();
      const startB = new Date(b.dateStart).getTime();
      return startB - startA;
    });

    return sortedRentals.length > 0
      ? new Date(sortedRentals[0].dateStart).toLocaleDateString()
      : undefined;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    fetch(`${API_URL}/api/users?name=${searchParam}`, {
      credentials: "include",
    });
  };

  const handleSelectUser = (user: UserMap) => {
    setSelectUser(user.id); 
    setChatModal(true); 
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
            <p className="gray-text" style={{ textAlign: "left" }}>
              ФИО/Контакты
            </p>

            <p className="gray-text">Последняя активность</p>
            <p className="gray-text">Активные брони</p>
            <p className="gray-text">Роль</p>
            <p className="gray-text">Чат</p>
          </div>
          {users
            .slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)
            .map((user: UserMap) => (
              <div key={user.id} className="user-item">
                <p>{user.id}</p>
                <div className="user-information">
                  <p>{user.name}</p>
                  <p className="gray-text">{user.contactPhone}</p>
                  <p className="gray-text">{user.email}</p>
                </div>
                <p>
                  {lastActivityDate(user.id, rentals) ||
                    new Date(user.createdAt).toLocaleDateString()}
                </p>
                <p>{reservationCount[user.id]?.toString() || "0"}</p>
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
                  <button
                   onClick={() => handleSelectUser(user)}

                   >
                    <MessageSquare />
                  </button>
                </p>
              </div>
            ))}
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </section>
      <SupportChat isOpen={chatModal}
      selectUser={selectUser}
       onClose={() => setChatModal(false)} />
    </>
  );
};

export default UsersComponent;
