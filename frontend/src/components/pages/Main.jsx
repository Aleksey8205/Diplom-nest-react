import React, { useState } from "react";
import Header from "./componenMain/Header.jsx";
import FormSearch from "./componenMain/FormSearch.jsx";
import ActualBook from "./componenMain/ActualBook.jsx";
import NewActual from "./componenMain/NewActual.jsx";
import About from "./componenMain/About.jsx";
import Footer from "./componenMain/Footer.jsx";
import MapLibrary from "./componenMain/MapLibrary.jsx";

const Main = () => {
    const [isSearching, setIsSearching] = useState(false);

    const startSearch = () => {
      setIsSearching(true);
    };

  return (
    <>
      <div className="container">
        <Header />
        <FormSearch onStartSearch={startSearch} />
      </div>
      {isSearching ? null : (
        <>
          <div className="container">
            <ActualBook />
          </div>
          <About />
          <div className="container">
            <NewActual />
            <MapLibrary />
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Main;
