import { Link, useNavigate } from 'react-router-dom';
import Button from '../button/button';
import Input from '../input/input';
import styles from './entrance.module.css'
import { useEffect, useState } from 'react';
import { setItem, decodedPassword } from '../../transport';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { readUser } from '../../redux/features/userSlice';

const EntarnceComponent = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const status = useSelector((state: RootState) => state.user.status);

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const errorMessageEmail = 'Такого пользователя не существует';

  useEffect(() => {
    if (status === 'succeeded') {
      if (user !== null && decodedPassword(user.passwordHash) === userPassword) {
        navigate('/lk-creating');
        setItem<string>('email', userEmail);
        setErrorEmail(false);
        setErrorPassword(false);
      } else {
        setErrorPassword(true);
      }
    } else if (status === 'failed') {
      setErrorEmail(true);
    }
  }, [status, user, userPassword, navigate, userEmail]);

  const handleButtonClickEntrance = (): void => {
    dispatch(readUser(userEmail));
  };

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
          value={userEmail}
          onCahge={event => setUserEmail(event.target.value)}
          error={errorEmail}
          errorMessage={errorMessageEmail}
        />
        <Input
          id="password"
          label="Введите пароль"
          placeholder='Введите пароль'
          type='password'
          value={userPassword}
          onCahge={event => setUserPassword(event.target.value)}
          error={errorPassword}
          errorMessage='Неверный пароль'
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
        <Button
          typeButton='empty'
          title='Вход'
          click={() => handleButtonClickEntrance()}
        />
      </div>
    </div>

  );
};

export default EntarnceComponent;

