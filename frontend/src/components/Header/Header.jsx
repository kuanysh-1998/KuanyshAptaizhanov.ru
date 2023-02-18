import "./header.scss";
import { useState, } from "react";
import HeaderLeft from "./HeaderLeft";
import Navbar from "./Navbar";
import HeaderRight from "./HeaderRight";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState("/");

  return (
    <header className="header">
      <HeaderLeft toggle={toggle} setToggle={setToggle} active={active} setActive={setActive} />
      <Navbar toggle={toggle} setToggle={setToggle} active={active} setActive={setActive} />
      <HeaderRight active={active} setActive={setActive}/>
    </header>
  );
};

export default Header;
