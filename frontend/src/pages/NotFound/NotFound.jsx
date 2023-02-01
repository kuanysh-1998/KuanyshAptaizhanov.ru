import './notfound.scss';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="notfound">
        <div className="notfound__title">
            404
        </div>
        <h1 className='notfound__text' >Страница Не Найдена</h1>

        <Link className='notfound__link' to="/">Перейти На Главную Страницу</Link>

    </section>
  )
}

export default NotFound