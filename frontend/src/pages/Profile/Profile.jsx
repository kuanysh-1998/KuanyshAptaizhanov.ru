import "./profile.scss";
import { MdAddAPhoto } from "react-icons/md";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import UpdateProfileModal from "./UodateProfileModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfile,
  getUserProfile,
  uploadProfilePhoto,
} from "../../redux/apiCalls/profileApiCall";
import { useParams, useNavigate } from "react-router-dom";
import PostItem from "../../components/Posts/PostItem";
import { Oval } from "react-loader-spinner";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [id]);

  const navigate = useNavigate();
  useEffect(() => {
    if (isProfileDeleted) {
      navigate("/");
    }
  }, [navigate, isProfileDeleted]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!file) return toast.warning("Выберите файл!");

    const formData = new FormData();
    formData.append("image", file);

    dispatch(uploadProfilePhoto(formData));
  };

  const deleteAccountHandler = () => {
    swal({
      title: "Вы уверены?",
      text: "Если удалите сейчас, то больше не сможете вернуть!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser());
      }
    });
  };

  if (loading) {
    return (
      <div className="profile__loader">
        <Oval
          height={120}
          width={120}
          color="#000"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="grey"
          strokeWidth={3}
          strokeWidthSecondary={3}
        />
      </div>
    );
  }
  return (
    <section className="profile">
      <div className="profile__header">
        <div className="profile__imagewrapper">
          <img
            src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url}
            alt=""
            className="profile__image"
          />

          {user?._id === profile?._id && (
            <form onSubmit={formSubmitHandler}>
              <abbr title="choose profile photo">
                <label htmlFor="file" className="profile__upload">
                  <MdAddAPhoto />
                </label>
              </abbr>
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <button className="profile__uploadbtn" type="submit">
                Загрузить
              </button>
            </form>
          )}
        </div>

        <h1 className="profile__username">{profile?.username}</h1>
        <p className="profile__bio">{profile?.bio}</p>
        <div className="profile__userdate">
          <strong>Дата присоединения: </strong>
          <span>{new Date(profile?.createdAt).toLocaleDateString()}</span>
        </div>

        {user?._id === profile?._id && (
          <button
            onClick={() => setUpdateProfile(true)}
            className="profile__updatebtn"
          >
            Обновить профиль
          </button>
        )}
      </div>

      <div className="profile__postslist">
        <h2>{profile?.username === 'Куаныш Аптайжанов' ? "Публикации Куаныша Аптайжанова" : `Публикации ${profile?.username}`  }</h2>
        {profile?.posts?.map((post) => (
          <PostItem
            key={post._id}
            post={post}
            username={profile?.username}
            userId={profile?._id}
          />
        ))}
      </div>

      {user?._id === profile?._id && (
        <button
          onClick={deleteAccountHandler}
          className="profile__deleteaccount"
        >
          Удалить Аккаунт
        </button>
      )}

      {updateProfile && (
        <UpdateProfileModal
          profile={profile}
          setUpdateProfile={setUpdateProfile}
        />
      )}
    </section>
  );
};

export default Profile;
