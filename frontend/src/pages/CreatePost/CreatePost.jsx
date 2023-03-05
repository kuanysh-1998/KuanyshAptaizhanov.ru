import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./createpost.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { RotatingLines } from "react-loader-spinner";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { Editor } from "@tinymce/tinymce-react";

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

        <Editor
          apiKey="1v4buzu0uwzu0rbeb4r8jepdrjiszv2bc1fombmbo4tjj3yn"
          onEditorChange={(newText) => {
            setDescription(newText);
          }}
          init={{
            height: 400,
            menubar: false,
            plugins:
              "anchor textcolor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
            toolbar:
              "undo redo | blocks fontfamily fontsize | forecolor backcolor | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
          }}
        />

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
