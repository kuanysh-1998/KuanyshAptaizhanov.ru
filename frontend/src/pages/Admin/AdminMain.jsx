import "./adminmain.scss";
import { Link } from "react-router-dom";
import AddCategoryForm from "./AddCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { getUsersCount } from "../../redux/apiCalls/profileApiCall";
import { getPostsCount } from "../../redux/apiCalls/postApiCall";
import { fetchAllComments } from "../../redux/apiCalls/commentApiCall";
const AdminMain = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { usersCount } = useSelector((state) => state.profile);
  const { postsCount } = useSelector((state) => state.post);
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getUsersCount());
    dispatch(getPostsCount());
    dispatch(fetchAllComments());
  }, []);
  return (
    <section className="adminmain">
      <div className="adminmain__header">
        <div className="adminmain__card">
          <h5 className="adminmain__card-title">Пользователи</h5>
          <div className="adminmain__card-count">{usersCount}</div>
          <div className="adminmain__card-linkwrapper">
            <Link
              className="adminmain__card-link"
              to="/admin-dashboard/users-table"
            >
              Посмотреть всех пользователей
            </Link>
          </div>
        </div>

        <div className="adminmain__card">
          <h5 className="adminmain__card-title">Посты</h5>
          <div className="adminmain__card-count">{postsCount}</div>
          <div className="adminmain__card-linkwrapper">
            <Link
              className="adminmain__card-link"
              to="/admin-dashboard/posts-table"
            >
              Посмотреть все посты
            </Link>
          </div>
        </div>

        <div className="adminmain__card">
          <h5 className="adminmain__card-title">Книги</h5>
          <div className="adminmain__card-count">{categories.length}</div>
          <div className="adminmain__card-linkwrapper">
            <Link
              className="adminmain__card-link"
              to="/admin-dashboard/categories-table"
            >
              Посмотреть все книги
            </Link>
          </div>
        </div>

        <div className="adminmain__card">
          <h5 className="adminmain__card-title">Комментарии</h5>
          <div className="adminmain__card-count">{comments.length}</div>
          <div className="adminmain__card-linkwrapper">
            <Link
              className="adminmain__card-link"
              to="/admin-dashboard/comments-table"
            >
              Посмотреть все комментарии
            </Link>
          </div>
        </div>
      </div>

      <AddCategoryForm />
    </section>
  );
};

export default AdminMain;
