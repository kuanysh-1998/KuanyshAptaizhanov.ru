import { TiDeleteOutline } from "react-icons/ti";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import bless from "../../images/bless.png"

const HeaderLeft = ({ toggle, setToggle, setActive }) => {
  return (
    <div className="header__left">
      <div className="header__logo">
        <Link onClick={() => setActive("/")} className="header__name" to="/">
          <img src={bless} alt="kuanysh" />
        </Link>
      </div>

      <div className="header__menu" onClick={() => setToggle((prev) => !prev)}>
        {toggle ? (
          <TiDeleteOutline className="header__menuicon" />
        ) : (
          <AiOutlineMenu className="header__menuicon" />
        )}
      </div>
    </div>
  );
};

export default HeaderLeft;
