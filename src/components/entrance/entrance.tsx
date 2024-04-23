import Button from '../button/button';
import Input from '../input/input';
import styles from './entrance.module.css'


const EntarnceComponent = (): JSX.Element => {
  return (
    <div
      className={styles.entarnceContainer}
    >
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
        <Button
          typeButton='blue'
          title='Регистрация'
        />
        <Button
          typeButton='empty'
          title='Вход'
        />
      </div>
    </div>

  );
};

export default EntarnceComponent;

