import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import "./createpost.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { RotatingLines } from "react-loader-spinner";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const CreatePost = () => {
  const dispatch = useDispatch();
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.category);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  const formSubmitHandler = (e) => {

    e.preventDefault();
    if (title.trim() === "") return toast.error("Напишите название для поста!");
    if (description.trim() === "")
      return toast.error("Заполните описание для поста!");
    if (category.trim() === "")
      return toast.error("Выберите название книги/темы!");
    if (!file) return toast.error("Выберите фото для поста!");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    dispatch(createPost(formData));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isPostCreated) {
      navigate("/");
    }
  }, [isPostCreated, navigate]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  const onChange = useCallback((description) => {
    setDescription(description);
  }, []);

  return (
    <section className="createpost">
      <h1 className="createpost__title">Создать Новый Пост</h1>

      <form onSubmit={formSubmitHandler} className="createpost__form">
        <input
          type="text"
          placeholder="Название Поста"
          className="createpost__input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="createpost__input"
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

        <SimpleMDE value={description} onChange={onChange} options={options} />

        {/* <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="createpost__textarea"
          rows="5"
          placeholder="Описание поста"
        ></textarea> */}

        <input
          type="file"
          name="file"
          id="file"
          className="createpost__upload"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit" className="createpost__btn">
          {loading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="40"
              visible={true}
            />
          ) : (
            "Создать"
          )}
        </button>
      </form>
    </section>
  );
};

export default CreatePost;

