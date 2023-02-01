import { useState } from "react";
import { toast } from "react-toastify";
import "./form.scss";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/apiCalls/passwordApiCall";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "")
      return toast.error("Поле «Email» должно быть заполнено");

    dispatch(forgotPassword(email));
  };
  return (
    <section className="register">
      <h1 className="register__title">Восстановить Пароль</h1>

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

        <button type="submit" className="register__btn">
          Восстановить
        </button>
      </form>
    </section>
  );
};

export default ForgotPassword;
