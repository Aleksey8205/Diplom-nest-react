import React from "react";
import Header from "./componenMain/Header.jsx";
import FormSearch from "./componenMain/FormSearch.jsx";
import ActualBook from "./componenMain/ActualBook.jsx";
import About from "./componenMain/About.jsx";

const Main = () => {
return (
    <>
    <div className="container">
    <Header />
    <FormSearch />
    <ActualBook />
    </div>
    <About />
    </>
)
}

export default Main;


// const Main = () => {
//     const [searchQuery, setSearchQuery] = useState("");
  
//     // Функция обновления запроса, которую отправим в FormSearch
//     const updateSearchQuery = (newQuery) => {
//       setSearchQuery(newQuery);
//     };
  
//     return (
//       <>
//         <Header />
//         <FormSearch onUpdateSearch={updateSearchQuery} />
//         {!searchQuery && <ActualBook />}
//       </>
//     );
//   };