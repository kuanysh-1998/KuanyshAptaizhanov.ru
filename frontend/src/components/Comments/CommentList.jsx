import "./commentlist.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import swal from "sweetalert";
import { useState } from "react";
import UpdateCommentModal from "./UpdateCommentModal";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";

const CommentList = ({ comments }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);

  const updateCommentHandler = (comment) => {
    setCommentForUpdate(comment);
    setUpdateComment(true);
  };

  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Вы уверены?",
      text: "Если удалите сейчас, то больше не сможете вернуть!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteComment(commentId));
      }
    });
  };

  return (
    <div className="commentlist">
      <h4 className="commentlist__count">{comments?.length} Комментарий</h4>

      {comments?.map((comment) => (
        <div key={comment._id} className="commentlist__item">
          <div className="commentlist__info">
            <div className="commentlist__username">{comment.username}</div>

            <div className="commentlist__time">
              <Moment fromNow>{comment.createdAt}</Moment>
            </div>
          </div>

          <p className="commentlist__text">{comment.text}</p>

          {user?._id === comment.user && (
            <div className="commentlist__iconwrapper">
              <TbEdit
                onClick={() => updateCommentHandler(comment)}
                className="bi-pencil-square commentlist__icons commentlist__iconedit"
              />
              <AiOutlineDelete
                onClick={() => deleteCommentHandler(comment?._id)}
                className="bi-trash-fill commentlist__icons"
              />
            </div>
          )}
        </div>
      ))}

      {updateComment && (
        <UpdateCommentModal
          commentForUpdate={commentForUpdate}
          setUpdateComment={setUpdateComment}
        />
      )}
    </div>
  );
};

export default CommentList;
