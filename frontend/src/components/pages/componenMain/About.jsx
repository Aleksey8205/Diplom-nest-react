import React from "react";
import "./style/about.css"
import stackBook1 from "../../../public/stack-of-books-1.svg"

const About = () => {
    return(
        <>
        <div className="about">

        <div className="text-about">
        </div>

        <div className="image-about">
        </div>
        <img className="img-about" src={stackBook1} alt="" />
        </div>
        </>
    )
}

export default About;