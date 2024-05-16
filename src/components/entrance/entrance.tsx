import { Link, useNavigate } from 'react-router-dom';
import Button from '../button/button';
import Input from '../input/input';
import styles from './entrance.module.css'


const EntarnceComponent = (): JSX.Element => {
  const navigate = useNavigate()
  return (
    <div
      className={styles.entarnceContainer}
    >
      <button className={styles.arrowBack} onClick={() => (navigate(-1))}></button>
      <h1 className={styles.header}>Вход</h1>
      <div
        className={styles.description}
      >
        Вы можете войти или зарегистрироваться
      </div>
      <div
        className={styles.inputsContainer}
      >
        <Input
          id="email"
          label="Ваш e-mail"
          placeholder='mail@mail.ru'
          type='email'
        />
        <Input
          id="password"
          label="Придумайте пароль"
          placeholder='Пароль содержит 6 знаков'
          type='password'
        />
      </div>
      <div
        className={styles.buttonContainer}
      >
        <Link to='/registration'>
          <Button
            typeButton='blue'
            title='Регистрация'
          />
        </Link>
        <Link to='/customerFeed'>
        <Button
          typeButton='empty'
          title='Вход'
        />
        </Link>
      </div>
    </div>

  );
};

export default EntarnceComponent;

