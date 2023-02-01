import { useState } from "react";
import { toast } from "react-toastify";
import "./form.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  getResetPassword,
  resetPassword,
} from "../../redux/apiCalls/passwordApiCall";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.password);
  const [password, setPassword] = useState("");

  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(getResetPassword(userId, token));
  }, [userId, token]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "")
      return toast.error("Поле «Пароль» должно быть заполнено");

    dispatch(resetPassword(password, { userId, token }));
  };

  return (
    <section className="register">
      {isError ? (
        <h1>Not Found</h1>
      ) : (
        <>
          <h1 className="register__title">Восстановить Пароль</h1>

          <form onSubmit={formSubmitHandler} className="register__form">
            <div className="register__formgroup">
              <label htmlFor="username" className="register__formlabel">
                Новый Пароль
              </label>

              <input
                type="password"
                className="register__forminput"
                id="password"
                placeholder="Вводите свой новый пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="register__btn">
              Восстановить
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default ResetPassword;
