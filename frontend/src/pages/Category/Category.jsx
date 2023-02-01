import { useParams, Link } from "react-router-dom";
import "./category.scss";
import PostList from "../../components/Posts/PostList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsBasedOnCategory } from "../../redux/apiCalls/postApiCall";

const Category = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { postsCate } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPostsBasedOnCategory(category));
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <section className="category">
      {postsCate.length === 0 ? (
        <>
          <h1 className="category__notfound">
            Посты с <span>{category}</span> не найдены
          </h1>
          <Link to="/posts" className="category__notfound-link">
            Перейти на публикации
          </Link>
        </>
      ) : (
        <>
          <h1 className="category__title"> Публикации на тему: "{category}"</h1>
          <PostList posts={postsCate} />
        </>
      )}
    </section>
  );
};

export default Category;
