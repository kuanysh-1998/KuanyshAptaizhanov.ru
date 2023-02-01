import { useState } from "react";
import { toast } from "react-toastify";
import "./categoryform.scss";
import { useDispatch } from "react-redux";
import { createCategory } from "../../redux/apiCalls/categoryApiCall";

const AddCategoryForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "")
      return toast.error("Напишите пожалуйста, название книги!");

    dispatch(createCategory({ title }));
    setTitle("");
  };
  return (
    <div className="addcategory">
      <h6 className="addcategory__title">Добавить новую книгу</h6>

      <form onSubmit={formSubmitHandler} className="addcategory__form">
        <div className="addcategory__form-group">
          <label htmlFor="title"> Название книги </label>
          <input
            type="text"
            id="title"
            placeholder="Введите название книги"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button type="submit" className="addcategory__btn">
          Добавить
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
