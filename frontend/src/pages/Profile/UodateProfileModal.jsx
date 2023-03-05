import "./updateprofilemodal.scss";
import { BsXCircle } from "react-icons/bs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/apiCalls/profileApiCall";

const UpdateProfileModal = ({ setUpdateProfile, profile }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);
  const [password, setPassword] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const updatedUser = { username, bio };

    if (password.trim() !== "") {
      updatedUser.password = password;
    }

    dispatch(updateProfile(profile?._id, updatedUser));
    setUpdateProfile(false);
  };

  return (
    <div className="update">
      <form onSubmit={formSubmitHandler} className="update__form">
        <abbr title="close">
          <BsXCircle
            className="update__icon"
            onClick={() => setUpdateProfile(false)}
          />
        </abbr>
        <h1 className="update__posttitle">Обновить Профиль</h1>
        <input
          type="text"
          className="update__input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Имя Пользователя"
        />

        <input
          type="text"
          className="update__input"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Био"
        />

        <input
          type="password"
          className="update__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
        />

        <button type="submit" className="update__btn">
          Обновить Профиль
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileModal;
