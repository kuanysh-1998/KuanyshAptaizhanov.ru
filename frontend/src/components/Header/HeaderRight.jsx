import { Link } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CiLogin, CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const HeaderRight = ({ active, setActive }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [dropdown, setDropdown] = useState(false);
  const popupClose = React.useRef(null);

  const logoutHandler = () => {
    setDropdown(false);
    dispatch(logoutUser());
  };

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.composedPath().includes(popupClose.current)) {
        setDropdown(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div  className="header__right">
      {user ? (
        <>
          <div ref={popupClose} onClick={() => setDropdown((prev) => !prev)} className="header__right-userinfo">
            <span
              
              className="header__right-username"
            >
              {user?.username}
            </span>
            <img
              className="header__right-userphoto"
              src={user?.profilePhoto.url}
              alt="user photo"
            />
            {dropdown && (
              <div className="header__right-dropdown">
                <Link
                  className="header__right-dropdownitem"
                  to={`/profile/${user?._id}`}
                  onClick={() => setDropdown((prev) => !prev)}
                >
                  <CgProfile />
                  <span>Профиль</span>
                </Link>
                <div
                  onClick={logoutHandler}
                  className="header__right-dropdownitem"
                >
                  <CiLogout />
                  <span>Выйти</span>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link
            onClick={() => setActive("")}
            to="/login"
            className="header__right-link"
          >
            <CiLogin className="header__right-icon" />
            <span>Войти</span>
          </Link>

          <Link
            onClick={() => setActive("")}
            to="/register"
            className="header__right-link"
          >
            <AiOutlineUserAdd className="header__right-icon" />
            <span>Регистрация</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderRight;
