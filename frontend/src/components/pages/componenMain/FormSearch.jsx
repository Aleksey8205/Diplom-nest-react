import React from "react";
import "./style/form.css";
import stackBook from "../../../public/stack-of-books-1.svg"


const FormSearch = () => {

  return (
    <>
      <form className="form-search">
        <label htmlFor="title-input">Название:</label>
        <input
          className="input"
          id="title-input"
          placeholder="Например, Евгений Онегин"
          type="text"
          name="bookTitle"
        />

        <label htmlFor="author-input">Автор:</label>
        <input
          className="input"
          id="author-input"
          placeholder="Например, Пушкин А.С."
          type="text"
          name="authorName"
        />

        <div className="block-date">
          <div>
            <label htmlFor="issue-date">
              <p>Выдача книги:</p>
            </label>
            <input
              className="input-date"
              id="issue-date"
              type="date"
              name="issueDate"
            />
          </div>

          <div>
            <label htmlFor="return-date">
              <p>Возврат книги:</p>
            </label>
            <input
            placeholder="выберите дату"
              className="input-date"
              id="return-date"
              type="date"
              name="returnDate"
            />
          </div>
        </div>
    <button className="button-one">Найти книгу</button>
      </form>
      
    </>
  );
};

export default FormSearch;
