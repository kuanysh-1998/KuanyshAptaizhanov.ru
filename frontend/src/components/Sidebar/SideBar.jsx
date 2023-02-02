import { Link } from "react-router-dom";
import "./sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <div className="sidebar">
      <h5 className="sidebar__title">КНИГИ</h5>

      <ul className="sidebar__links">
        {categories.map((category) => (
          <Link
            className="sidebar__link"
            key={category._id}
            to={`/posts/categories/${category.title}`}
          >
            {category.title}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
