import { useEffect, useState } from "react";
import { useUser } from "../interface/UserContext.ts";
import type { UserMap } from "./interface/interface.ts";

const API_URL = import.meta.env.VITE_API_URL ?? "";

const UsersComponent = () => {
  const user = useUser();
  const [users, setUsers] = useState([]);
  const [searchParam, setSearchParam] = useState('')

  useEffect(() => {
    fetch(`${API_URL}/api/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    fetch(`${API_URL}/api/users?name=${searchParam}`)
  }

  return (
    <>
      <section>
        <div className="flex">
          <h2 className="hello-panel">Пользователи</h2>
          {user && user.role === "admin" && (
            <button className="button-one">Добавить пользователя</button>
          )}
        </div>
        <form onSubmit={handleSubmit}>
        <input type="text"
        value={searchParam} 
        onChange={(e) => setSearchParam(e.target.value)}
        />
        </form>
        
        <div>
            {users.map((users: UserMap, idx) => (
                <p>{users.name}</p>
            ))}
        </div>
      </section>
    </>
  );
};

export default UsersComponent;
