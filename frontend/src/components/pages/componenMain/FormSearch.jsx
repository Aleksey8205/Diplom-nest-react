import React from "react";
import "./style/form.css";
import StackBooks2 from "../../../public/stack-of-books-2.svg";

const FormSearch = () => {
  return (
    <>
      <div className="block-form">
        <form className="form-search">
          <div>
            <label htmlFor="title-input">
              <span className="label-input">Название:</span>
            </label>
            <input
              className="input"
              id="title-input"
              placeholder="Например, Евгений Онегин"
              type="text"
              name="bookTitle"
            />
          </div>

          <div>
            <label htmlFor="author-input">
              <span className="label-input">Автор:</span>
            </label>
            <input
              className="input"
              id="author-input"
              placeholder="Например, Пушкин А.С."
              type="text"
              name="authorName"
            />
          </div>

          <div className="block-date">
            <div className="date">
              <label htmlFor="issue-date">
                <span className="label-input">Выдача книги:</span>
              </label>
              <input
                className="input-date"
                id="issue-date"
                type="date"
                name="issueDate"
              />
            </div>
            <div className="date">
              <label htmlFor="return-date">
                <span className="label-input">Возврат книги:</span>
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
        <img src={StackBooks2} alt="" />
      </div>
    </>
  );
};

export default FormSearch;
