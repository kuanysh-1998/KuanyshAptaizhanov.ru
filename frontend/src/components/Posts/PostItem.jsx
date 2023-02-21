import { Link } from "react-router-dom";

const PostItem = ({ post, username, userId }) => {
  const profileLink = userId
    ? `/profile/${userId}`
    : `/profile/${post?.user?._id}`;


  const sliceText = post?.description.slice(0, 130);

  return (
    <div className="postitem">
      <div className="postitem__imagewrapper">
        <img src={post?.image?.url} alt="" className="postitem__image" />
      </div>

      <div className="postitem__infowrapper">
        <div className="postitem__info">
          <div className="postitem__author">
            <strong>Автор: </strong>
            <Link className="postitem__username" to={profileLink}>
              {username ? username : post?.user?.username}
            </Link>
          </div>
          <div className="postitem__date">
            {new Date(post?.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="postitem__details">
          <h4 className="postitem__title">{post?.title}</h4>
          <Link
            className="postitem__category"
            to={`/posts/categories/${post?.category}`}
          >
            {post?.category}
          </Link>
        </div>

        <span
          dangerouslySetInnerHTML={{ __html: `${sliceText}.....` }}
          className="postitem__description"
        />

        {/* <p
          dangerouslySetInnerHTML={{ __html: post?.description }}
          className="postitem__description"
        ></p> */}
        <Link className="postitem__link" to={`/posts/details/${post?._id}`}>
          Читать...
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
