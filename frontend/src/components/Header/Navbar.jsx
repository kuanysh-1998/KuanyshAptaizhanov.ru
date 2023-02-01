import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ toggle, setToggle, active, setActive }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <nav
      style={{
        clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      }}
      className="navbar"
    >
      <ul className="navbar__links">
        <Link
          to="/"
          className={active === "/" ? "navbar__link active" : "navbar__link"}
          onClick={() => {
            setActive("/");
            setToggle(false);
          }}
        >
          Главная
        </Link>

        <Link
          to="/posts"
          className={
            active === "/posts" ? "navbar__link active" : "navbar__link"
          }
          onClick={() => {
            setActive("/posts");
            setToggle(false);
          }}
        >
          Блог
        </Link>

        {user?.isAdmin && (
          <Link
            to="/posts/create-post"
            className={
              active === "/posts/create-post"
                ? "navbar__link active"
                : "navbar__link"
            }
            onClick={() => {
              setActive("/posts/create-post");
              setToggle(false);
            }}
          >
            Новый пост
          </Link>
        )}

        {user?.isAdmin && (
          <Link
            to="/admin-dashboard"
            className={
              active === "/admin-dashboard"
                ? "navbar__link active"
                : "navbar__link"
            }
            onClick={() => {
              setActive("/admin-dashboard");
              setToggle(false);
            }}
          >
            Админ
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
