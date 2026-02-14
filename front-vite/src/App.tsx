import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { loginSuccess, loginError } from './utils/authSlice.ts';
import "./components/style/body.css"

import Main from "./components/pages/Main.tsx";
import PersonalPage from "./components/pages/Personal.tsx";

const API_URL = import.meta.env.VITE_API_URL ?? '';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
   fetch(`${API_URL}/api/auth/user-info`, { credentials: 'include' })
   .then(response => {
    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status}`);
    }
    return response.json(); 
  })
  .then(data => {
    if (data) {
      dispatch(loginSuccess(data));
    } else {
      dispatch(loginError(data));
    }
  })
  .catch(error => {
    dispatch(loginError('Ошибка входа' + error));
  });
  }, [dispatch]);

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/me" element={<PersonalPage />} />
        </Routes>
        
      </Router>
  );
}

export default App;
