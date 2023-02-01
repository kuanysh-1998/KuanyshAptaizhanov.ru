import "./comment.scss";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/apiCalls/commentApiCall";

const AddComment = ({ postId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (text.trim() === "") return toast.error("Напишите комментарий!");
    dispatch(createComment({ text, postId }));
    setText("");
  };
  return (
    <form onSubmit={formSubmitHandler} className="comment">
      <input
        type="text"
        placeholder="Написать комментарий"
        className="comment__input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit" className="comment__btn">
        Отправить
      </button>
    </form>
  );
};

export default AddComment;
