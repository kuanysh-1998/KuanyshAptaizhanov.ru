import "./footer.scss";
import { BsTelegram } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <footer className="footer">
      <Link to="/" className="footer__logo">
        KUANYSH
      </Link>

      <ul className="footer__permalinks">
        <Link to="/" className="footer__item" onClick={() => setToggle(false)}>
          Главная
        </Link>
        <Link
          to="/posts"
          className="footer__item"
          onClick={() => setToggle(false)}
        >
          Посты
        </Link>
      </ul>

      <div className="footer__socials">
        <a
          href="https://www.instagram.com/kuanysh_aptaizhanov/"
          target="_blank"
        >
          <AiFillInstagram />
        </a>
        <a href="https://t.me/Kuanysh_Aptaizhanov" target="_blank">
          <BsTelegram />
        </a>
        <a
          href="mailto:kuanysh.aptayzhanov@mail.ru"
          target="_blank"
          rel="noreferrer"
        >
          <MdEmail />
        </a>
      </div>

      <div className="footer__copyright">
        <small>&copy; 2023. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
