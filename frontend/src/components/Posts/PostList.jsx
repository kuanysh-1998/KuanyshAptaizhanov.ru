import PostItem from "./PostItem"
import './postlist.scss';

const PostList = ({posts}) => {
  return (
    <div className="post__list">
        {
            [...posts].map(item => <PostItem post={item} key={item._id} />)
        }
    </div>
  )
}

export default PostList