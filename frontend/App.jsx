import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./src/components/style.css/body.css"

import Main from "./src/components/pages/Main.jsx";
import PersonalPage from "./src/components/pages/Personal.jsx";

function App() {
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
