import React, { useState } from "react";
import Header from "./componenMain/Header.jsx";
import FormSearch from "./componenMain/FormSearch.jsx";
import ActualBook from "./componenMain/ActualBook.jsx";
import NewActual from "./componenMain/NewActual.jsx";
import About from "./componenMain/About.jsx";
import Footer from "./componenMain/Footer.jsx";
import MapLibrary from "./componenMain/MapLibrary.jsx";
import Booking from "./componenMain/Booking.jsx";

const Main = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [booking, setIsBooking] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState(null);

  const startSearch = () => {
    setIsSearching(true);
  };

  const startBooking = (bookId) => {
    console.log(bookId)
    setSelectedBooks(bookId);
    setIsBooking(true)
  }

  return (
    <>
      <div className="container">
        <Header />
        {!booking ? (
          <FormSearch onStartSearch={startSearch} onStartBooking={startBooking} />
        ) : <Booking bookId={selectedBooks} />}
      </div>
      
      {booking || isSearching ? null : (
        <>
          <div className="container">
            <ActualBook onStartBooking={startBooking} />
          </div>
          <About />
          <div className="container">
            <NewActual onStartBooking={startBooking} />
            <MapLibrary />
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Main;
