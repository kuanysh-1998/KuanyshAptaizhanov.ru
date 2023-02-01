import { Link } from "react-router-dom";
import "./adminsidebar.scss";

const AdminSidebar = () => {
  return (
    <section className="adminsidebar">
      <Link to="/admin-dashboard" className="adminsidebar__title">
        Дашборд
      </Link>

      <ul className="adminsidebar__list">
        <Link className="adminsidebar__link" to="/admin-dashboard/users-table">Пользователи</Link>
        <Link className="adminsidebar__link" to="/admin-dashboard/posts-table">Посты</Link>
        <Link className="adminsidebar__link" to="/admin-dashboard/categories-table">Книги</Link>
        <Link className="adminsidebar__link" to="/admin-dashboard/comments-table">Комментарии</Link>
      </ul>
    </section>
  );
};

export default AdminSidebar;
