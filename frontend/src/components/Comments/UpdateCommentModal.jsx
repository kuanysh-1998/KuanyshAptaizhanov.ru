import "./updatecommentmodal.scss";
import { BsXCircle } from "react-icons/bs";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/apiCalls/commentApiCall";

const UpdateCommentModal = ({ setUpdateComment, commentForUpdate }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(commentForUpdate?.text);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (text.trim() === "") return toast.error("Пожалуйста, напишите что-то!");

    dispatch(updateComment(commentForUpdate?._id, { text }));
    setUpdateComment(false);
  };

  return (
    <div className="updatecomment">
      <form onSubmit={formSubmitHandler} className="updatecomment__form">
        <abbr title="close">
          <BsXCircle
            className="updatecomment__icon"
            onClick={() => setUpdateComment(false)}
          />
        </abbr>
        <h1 className="updatecomment__title">Редактировать Комментарий</h1>
        <input
          type="text"
          className="updatecomment__input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button type="submit" className="updatecomment__btn">
          Редактировать Комментарий
        </button>
      </form>
    </div>
  );
};

export default UpdateCommentModal;
