import "./update.scss";
import { BsXCircle } from "react-icons/bs";
import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/apiCalls/postApiCall";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { Editor } from "@tinymce/tinymce-react";

const UpdatePostModal = ({ setUpdatePost, post }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [category, setCategory] = useState(post.category);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === "") return toast.error("Напишите название для поста!");
    if (description.trim() === "")
      return toast.error("Заполните описание для поста!");
    if (category.trim() === "")
      return toast.error("Выберите название книги/темы!");

    dispatch(updatePost({ title, category, description }, post?._id));
    setUpdatePost(false);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className="update">
      <form onSubmit={formSubmitHandler} className="update__form">
        <abbr title="close">
          <BsXCircle
            className="update__icon"
            onClick={() => setUpdatePost(false)}
          />
        </abbr>
        <h1 className="update__posttitle">Обновить Пост</h1>
        <input
          type="text"
          className="update__input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="update__input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
            Выбрать Книгу
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>

        <Editor
          apiKey="1v4buzu0uwzu0rbeb4r8jepdrjiszv2bc1fombmbo4tjj3yn"
          initialValue={description}
          onEditorChange={(newText) => {
            setDescription(newText);
          }}
        />

        {/* 
        <textarea
          className="update__textarea"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea> */}

        <button type="submit" className="update__btn">
          Обновить Пост
        </button>
      </form>
    </div>
  );
};

export default UpdatePostModal;
