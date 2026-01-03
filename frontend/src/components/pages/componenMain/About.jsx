import React from "react";
import "./style/about.css";
import stackBook1 from "../../../public/stack-of-books-1.svg";
import amorphusShape1  from "../../../public/amorphous-shape-3.svg"

const About = () => {
  return (
    <>
      <div className="about">
        <div className="text-about">
          <h2 className="caption-about">О нас</h2>
          <p className="about-text">
            Наш сервис — это единый портал, соединяющий все крупнейшие и малые
            библиотеки Москвы. Здесь работают лучшие библиотекари, краеведы и
            историки города, бережно собирающие и описывающие книжные сокровища
            столицы. Через наш агрегатор вы сможете быстро найти любую книгу —
            от редких дореволюционных изданий до новинок современной литературы.
          </p>
          <p className="about-text">
            Достаточно ввести название или автора и система покажет, в каких
            библиотеках есть нужный экземпляр. Вы можете выбрать удобный филиал,
            забронировать книгу онлайн и забрать её в назначенное время.
          </p>
          <p className="about-text">
            Сервис охватывает все округа Москвы, так что любимые книги всегда
            окажутся рядом.
          </p>
        </div>

        <div className="image-about">
          <img className="img-shape" src={amorphusShape1} alt="" />
          <img className="img-about" src={stackBook1} alt="" />
        </div>
      </div>
    </>
  );
};

export default About;
