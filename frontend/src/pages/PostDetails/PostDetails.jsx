import "./postdetails.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddComment from "../../components/Comments/AddComment";
import CommentList from "../../components/Comments/CommentList";
import swal from "sweetalert";
import UpdatePostModal from "./UpdatePostModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  fetchSinglePost,
  toggleLikePost,
  updatePostImage,
} from "../../redux/apiCalls/postApiCall";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(fetchSinglePost(id));
  }, [id]);

  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("Файл не выбран!");

    const formData = new FormData();

    formData.append("image", file);
    dispatch(updatePostImage(formData, post?._id));
  };

  const deletePostHandler = () => {
    swal({
      title: "Вы уверены?",
      text: "Если удалите сейчас, то больше не сможете вернуть!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      }
    });
  };

  return (
    <section className="postdetails">
      <div className="postdetails__imagewrapper">
        <img
          src={file ? URL.createObjectURL(file) : post?.image?.url}
          alt=""
          className="postdetails__image"
        />

        {user?._id === post?.user?._id && (
          <form
            onSubmit={updateImageSubmitHandler}
            className="postdetails__updateimageform"
          >
            <label htmlFor="file" className="postdetails__updatepostlabel">
              <FiUserPlus className="postdetails__updatepostlabel-icon" />
              Выбрать новое фото
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit">Загрузить</button>
          </form>
        )}
      </div>
      <h1 className="postdetails__title">{post?.title}</h1>
      <div className="postdetails__userinfo">
        <img
          src={post?.user?.profilePhoto?.url}
          alt=""
          className="postdetails__userimage"
        />
        <div className="postdetails__user">
          <strong>
            <Link
              className="postdetails__usr"
              to={`/profile/${post?.user?._id}`}
            >
              {post?.user?.username}
            </Link>
          </strong>
          <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      {/* <div
        dangerouslySetInnerHTML={{ __html: post?.description }}
        className="postdetails__description"
      /> */}
      <span
        className="postdetails__description"
        dangerouslySetInnerHTML={{ __html: post?.description }}
      />
      <div className="postdetails__iconwrapper">
        <div className="postdetails__iconwrapper-item">
          {user && (
            <i
              onClick={() => dispatch(toggleLikePost(post?._id))}
              className={
                post?.likes.includes(user?._id)
                  ? "bi bi-hand-thumbs-up-fill"
                  : "bi bi-hand-thumbs-up"
              }
            ></i>
          )}

          <small>{post?.likes?.length} likes</small>
        </div>

        {user?._id === post?.user?._id && (
          <div>
            <TbEdit
              onClick={() => setUpdatePost(true)}
              className="bi-pencil-square postdetails__icons postdetails__iconedit"
            />
            <AiOutlineDelete
              onClick={deletePostHandler}
              className="bi-trash-fill postdetails__icons"
            />
          </div>
        )}
      </div>
      {user ? (
        <AddComment postId={post?._id} />
      ) : (
        <p className="postdetails__infocomment">
          Чтобы добавить комментарий, нужно сначала зарегистрироваться!
        </p>
      )}
      <CommentList comments={post?.comments} />
      {updatePost && (
        <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />
      )}
    </section>
  );
};

export default PostDetails;
