import { useState } from "react";
import Header from "./componenMain/Header.tsx";
import FormSearch from "./componenMain/FormSearch.tsx";
import ActualBook from "./componenMain/ActualBook.tsx";
import NewActual from "./componenMain/NewActual.tsx";
import About from "./componenMain/About.tsx";
import Footer from "./componenMain/Footer.tsx";
import MapLibrary from "./componenMain/MapLibrary.tsx";
import type { Book } from "./componenMain/interface/interface.ts";
import Booking from "./componenMain/Booking.tsx";

const Main = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [booking, setIsBooking] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<Book>();

  const startSearch = () => {
    setIsSearching(true);
  };

  const startBooking = (bookItem: Book) => {
    setSelectedBooks(bookItem);
    setIsBooking(true);
  };

  return (
    <>
      <div className="container">
        <Header />
        {!booking ? (
          <FormSearch
            onStartSearch={startSearch}
            onStartBooking={startBooking}
          />
        ) : (
          <Booking bookItem={selectedBooks} />
        )}
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
