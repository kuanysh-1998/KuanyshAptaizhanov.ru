import AdminSidebar from "./AdminSidebar";
import "./admintable.scss";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteProfile,
  getAllUsersProfile,
} from "../../redux/apiCalls/profileApiCall";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { profiles, isProfileDeleted } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getAllUsersProfile());
  }, [isProfileDeleted]);
  const deleteUserHandler = (userId) => {
    swal({
      title: "Вы уверены?",
      text: "Если удалите сейчас, то больше не сможете вернуть!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProfile(userId));
      }
    });
  };
  return (
    <section className="table">
      <AdminSidebar />
      <div className="table__wrapper">
        <h1 className="table__title">Пользователи</h1>

        <table className="table__table">
          <thead>
            <tr className="table__th">
              <th>Количество</th>
              <th>Пользователь</th>
              <th>Email</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table__image">
                    <img
                      className="table__userimg"
                      src={item.profilePhoto?.url}
                      alt=""
                    />
                    <span className="table__username">{item.username}</span>
                  </div>
                </td>

                <td>{item.email}</td>
                <td>
                  <div className="table__btngroup">
                    <button>
                      <Link to={`/profile/${item._id}`}>
                        Посмотреть Профиль
                      </Link>
                    </button>
                    <button onClick={() => deleteUserHandler(item._id)}>
                      Удалить Пользователя
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

export default UsersTable;
