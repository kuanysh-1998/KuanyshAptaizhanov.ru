import PostList from "../../components/Posts/PostList";
import "./home.scss";
import Sidebar from "../../components/Sidebar/SideBar";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts(1));
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>Kuanysh Aptaizhanov</title>
        <meta name="description" content="Блог Куаныша Аптайжанова" />
        <link rel="canonical" href="/" />
      </Helmet>

      <section>
        <div className="home">
          <div className="home__header">
            <div className="home__header-layout">
              <h2 className="home__title">
                Добро пожаловать на официальный сайт
              </h2>
              <h1 className="home__titlename">
                <Typewriter
                  options={{
                    autoStart: true,
                    loop: true,
                    delay: 160,
                    strings: ["Куаныша Аптайжанова"],
                  }}
                />
              </h1>
            </div>
          </div>

          <div className="home__latestpost">Последние публикации</div>
        </div>

        <div className="home__container">
          <PostList posts={posts} />
          <Sidebar />
        </div>

        <div className="home__seepostslink">
          <Link to="/posts" className="home__link">
            Посмотреть все публикации
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
