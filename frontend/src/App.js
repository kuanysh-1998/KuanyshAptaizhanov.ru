import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Forms/Login";
import Register from "./pages/Forms/Register";
import PostsPage from "./pages/PostsPage/PostsPage";
import CreatePost from "./pages/CreatePost/CreatePost";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Footer from "./components/Footer/Footer";
import PostDetails from "./pages/PostDetails/PostDetails";
import { ToastContainer } from "react-toastify";
import Category from "./pages/Category/Category";
import Profile from "./pages/Profile/Profile";
import UsersTable from "./pages/Admin/UsersTable";
import PostsTable from "./pages/Admin/PostsTable";
import CategoriesTable from "./pages/Admin/CategoriesTable";
import CommentsTable from "./pages/Admin/CommentsTable";
import ForgotPassword from "./pages/Forms/ForgotPassword";
import ResetPassword from "./pages/Forms/ResetPassword";
import NotFound from "./pages/NotFound/NotFound";
import { useSelector } from "react-redux";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";


function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <HashRouter>
        <ToastContainer theme="colored" position="top-center" />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/users/:userId/verify/:token"
          element={!user ? <VerifyEmail /> : <Navigate to="/" />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password/:userId/:token"
          element={<ResetPassword />}
        />
          <Route path="/profile/:id" element={<Profile />} />

          <Route path="/posts" element={<PostsPage />} />
          <Route
            path="/posts/create-post"
            element={user?.isAdmin ? <CreatePost /> : <Navigate to="/" />}
          />

          <Route path="/posts/details/:id" element={<PostDetails />} />
          <Route path="/posts/categories/:category" element={<Category />} />

          <Route path="admin-dashboard">
            <Route
              index
              element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
            />
            <Route
              path="users-table"
              element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />}
            />
            <Route
              path="posts-table"
              element={user?.isAdmin ? <PostsTable /> : <Navigate to="/" />}
            />
            <Route
              path="categories-table"
              element={
                user?.isAdmin ? <CategoriesTable /> : <Navigate to="/" />
              }
            />
            <Route
              path="comments-table"
              element={user?.isAdmin ? <CommentsTable /> : <Navigate to="/" />}
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </HashRouter>
    </>
  );
}

export default App;
