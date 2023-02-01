import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./form.scss";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "")
      return toast.error("Поле «Email» должно быть заполнено");
    if (password.trim() === "")
      return toast.error("Поле «Пароль» должно быть заполнено");

    dispatch(loginUser({ email, password }));
  };
  return (
    <section className="register">
      <h1 className="register__title">Войти в свой аккаунт</h1>

      <form onSubmit={formSubmitHandler} className="register__form">
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
          Войти
        </button>
      </form>

      <div className="register__footer">
        Вы забыли свой пароль?{" "}
        <Link to="/forgot-password">Восстановить пароль</Link>
      </div>
    </section>
  );
};

export default Login;
