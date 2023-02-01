import "./verifyemail.scss";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyEmail } from "../../redux/apiCalls/authApiCall";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { isEmailVerified } = useSelector((state) => state.auth);
  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(verifyEmail(userId, token));
  }, [userId, token]);
  return (
    <section className="verifyemail">
      {isEmailVerified ? (
        <>
          <i className="bi bi-patch-check verifyemail__icon"></i>
          <h1 className="verifyemail__title">
            Ваша электронная почта успешно подтверждена!
          </h1>
          <Link to="/login" className="verifyemail__link">
            Войти
          </Link>
        </>
      ) : (
        <>
          <h1 className="verifyemail__notfound">Не найдена!</h1>
        </>
      )}
    </section>
  );
};

export default VerifyEmail;
