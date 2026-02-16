import { useSelector } from "react-redux";
import { RootState, UserInfo } from "../../../../utils/interface";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";

const ProfileComponent = () => {
  const user = useSelector((state: RootState) => state.auth);
  const [userInformation, setUserInformation] = useState<UserInfo | null>(null);
  const [editedFullName, setEditedFullName] = useState<string>("");
  const [editedEmail, setEditedEmail] = useState<string>("");
  const [editedPhone, setEditedPhone] = useState<string>("");
  const [password, setEditedPassword] = useState<string>("*********");

  useEffect(() => {
    fetch(`${API_URL}/api/comon/users/${user.user?.id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserInformation(data);
        setEditedFullName(data.name);
        setEditedEmail(data.email);
        setEditedPhone(data.contactPhone);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [user]);

  const handleSaveChanges = async () => {};

  if (!userInformation) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <div className="head-panel">
        <h2 className="hello-panel">Настройки</h2>
        <button className="button-one" type="button">
          Назад
        </button>
      </div>
      <div className="container-settings">
        <label htmlFor="full-name-input">
          <span className="label-input">ФИО</span>
        </label>
        <input
          className="input"
          id="full-name-input"
          type="text"
          value={editedFullName}
          onChange={(event) => setEditedFullName(event.target.value)}
        />
        <label htmlFor="full-name-input">
          <span className="label-input">Телефон</span>
        </label>
        <input
          className="input"
          id="full-name-input"
          type="text"
          value={editedPhone}
          onChange={(event) => setEditedPhone(event.target.value)}
        />
        <label htmlFor="email-input">
          <span className="label-input">Почта</span>
        </label>
        <input
          className="input"
          id="email-input"
          type="email"
          value={editedEmail}
          onChange={(event) => setEditedEmail(event.target.value)}
        />

        <label htmlFor="email-input">
          <span className="label-input">Пароль</span>
        </label>
        <input
          className="input"
          id="email-input"
          type="password"
          value={password}

          onChange={(event) => setEditedPassword(event.target.value)}
        />

        <button
          onClick={handleSaveChanges}
          className="button-one"
          type="button"
        >
          Сохранить
        </button>
      </div>
    </>
  );
};

export default ProfileComponent;
