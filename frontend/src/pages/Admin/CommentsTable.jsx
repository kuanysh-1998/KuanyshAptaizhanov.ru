import AdminSidebar from "./AdminSidebar";
import "./admintable.scss";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteComment,
  fetchAllComments,
} from "../../redux/apiCalls/commentApiCall";

const CommentsTable = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(fetchAllComments());
  }, []);

  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Вы уверены?",
      text: "Если удалите сейчас, то больше не сможете вернуть!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteComment(commentId));
      }
    });
  };
  return (
    <section className="table">
      <AdminSidebar />
      <div className="table__wrapper">
        <h1 className="table__title">Комментарии</h1>

        <table className="table__table">
          <thead>
            <tr className="table__th">
              <th>Количество</th>
              <th>Пользователь</th>
              <th>Комментарий</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table__image">
                    <img
                      className="table__userimg"
                      src={item.user.profilePhoto?.url}
                      alt=""
                    />
                    <span className="table__username">
                      {item.user.username}
                    </span>
                  </div>
                </td>

                <td>{item.text}</td>
                <td>
                  <div className="table__btngroup">
                    <button onClick={() => deleteCommentHandler(item._id)}>
                      Удалить Комментарий
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

export default CommentsTable;
