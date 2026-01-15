import "./style/footer.css"
import VK from "../../../public/social-vk.svg"
import TG from "../../../public/social-telegram.svg"
import YouTube from "../../../public/social-youtube.svg"
import OK from "../../../public/social-odnoklassniki.svg"

const Footer = () => {
    return(
        <>
        <footer className="footer">
            <div className="footer-container">
            <a className="logo" href="">ЛОГО</a>
            <div className="social-icons">
                <a className="link-social" href=""><img className="social-icon" src={VK} alt="" /></a>
                <a className="link-social" href=""><img className="social-icon" src={TG} alt="" /></a>
                <a className="link-social" href=""><img className="social-icon" src={YouTube} alt="" /></a>
                <a className="link-social" href=""><img className="social-icon" src={OK} alt="" /></a>
            </div>
            <p>Политика обработки персональных данных</p>
            </div>
        </footer>
        </>
    )
}

export default Footer;