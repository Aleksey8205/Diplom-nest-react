import { useEffect, useState } from "react";
import Aside from "./componentPersonal/Aside.tsx";
import type { UserInfo } from "../../utils/interface.ts";
import { UserContext } from "./componentPersonal/interface/UserContext.ts";

const API_URL = import.meta.env.VITE_API_URL ?? "";

const PersonalPage = () => {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/auth/user-info`, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.log(error));
  }, []);

  if (!user) {
    return;
  }

  return (
    <UserContext.Provider value={user}>
      <div className="container">
        <Aside />
      </div>
    </UserContext.Provider>
  );
};
export default PersonalPage;
