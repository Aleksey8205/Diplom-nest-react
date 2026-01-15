import MainAdmin from "./MainAdmin.tsx";
import MainClient from "./MainClient.tsx";
import MainManager from "./MainManager.tsx";
import { useUser } from "../interface/UserContext.ts";

const MainComponent = () => {
  const user = useUser();
  return (
    <>
      {user && user.role === "client" && <MainClient />}

      {user && user.role === "manager" && <MainManager />}

      {user && user.role === "admin" && <MainAdmin />}
    </>
  );
};

export default MainComponent;
