import AdminSidebar from "./AdminSidebar";
import "./admintable.scss";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteCategory,
  fetchCategories,
} from "../../redux/apiCalls/categoryApiCall";
const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories);
  }, []);
  const deleteCategoryHandler = (categoryId) => {
    swal({
      title: "Вы уверены?",
      text: "Если удалите сейчас, то больше не сможете вернуть!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteCategory(categoryId));
      }
    });
  };
  return (
    <section className="table">
      <AdminSidebar />
      <div className="table__wrapper">
        <h1 className="table__title">Книги</h1>

        <table className="table__table">
          <thead>
            <tr className="table__th">
              <th>Количество</th>
              <th>Название Книги</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <b>{item.title}</b>
                </td>
                <td>
                  <div className="table__btngroup">
                    <button onClick={() => deleteCategoryHandler(item._id)}>
                      Удалить Книгу
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CategoriesTable;
