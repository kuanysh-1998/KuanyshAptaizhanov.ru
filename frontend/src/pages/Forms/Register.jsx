import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./form.scss";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert";

const Register = () => {
  const dispatch = useDispatch();
  const { registerMessage } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (username.trim() === "")
      return toast.error("Поле «Имя Пользователя» должно быть заполнено");
    if (email.trim() === "")
      return toast.error("Поле «Email» должно быть заполнено");
    if (password.trim() === "")
      return toast.error("Поле «Пароль» должно быть заполнено");

    dispatch(registerUser({ username, email, password }));
  };

  const navigate = useNavigate();

  if (registerMessage) {
    swal({
      title: registerMessage,
      icon: "success",
    }).then((isOk) => {
      if (isOk) {
        navigate("/login");
      }
    });
  }
  return (
    <section className="register">
      <h1 className="register__title">Создать новый аккаунт</h1>

      <form onSubmit={formSubmitHandler} className="register__form">
        <div className="register__formgroup">
          <label htmlFor="username" className="register__formlabel">
            Имя пользователя
          </label>

          <input
            type="text"
            className="register__forminput"
            id="username"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="register__formgroup">
          <label htmlFor="email" className="register__formlabel">
            Email
          </label>

          <input
            type="email"
            className="register__forminput"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="register__formgroup">
          <label htmlFor="username" className="register__formlabel">
            Пароль
          </label>

          <input
            type="password"
            className="register__forminput"
            id="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="register__btn">
          Зарегистрироваться
        </button>
      </form>

      <div className="register__footer">
        У вас уже есть аккаунт? <Link to="/login">Войти</Link>
      </div>
    </section>
  );
};

export default Register;
