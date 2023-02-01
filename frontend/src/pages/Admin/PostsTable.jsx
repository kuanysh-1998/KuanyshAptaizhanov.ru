import AdminSidebar from "./AdminSidebar";
import "./admintable.scss";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPosts, deletePost } from "../../redux/apiCalls/postApiCall";

const PostsTable = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  const deletePostHandler = (postId) => {
    swal({
      title: "Вы уверены?",
      text: "Если удалите сейчас, то больше не сможете вернуть!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(postId));
      }
    });
  };
  return (
    <section className="table">
      <AdminSidebar />
      <div className="table__wrapper">
        <h1 className="table__title">Посты</h1>

        <table className="table__table">
          <thead>
            <tr className="table__th">
              <th>Количество</th>
              <th>Пользователь</th>
              <th>Название Поста</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table__image">
                    <img
                      className="table__userimg"
                      src={item.user?.profilePhoto?.url}
                      alt=""
                    />
                    <span className="table__username">
                      {item.user?.username}
                    </span>
                  </div>
                </td>

                <td>{item.title}</td>
                <td>
                  <div className="table__btngroup">
                    <button>
                      <Link to={`/posts/details/${item._id}`}>
                        Посмотреть Пост
                      </Link>
                    </button>
                    <button onClick={() => deletePostHandler(item._id)}>Удалить Пост</button>
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

export default PostsTable;
