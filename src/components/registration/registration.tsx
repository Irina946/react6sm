import { Link, useNavigate } from 'react-router-dom';
import Button from '../button/button';
import Input from '../input/input';
import styles from './registration.module.css'
import { useState } from 'react';
import { TUserSchema, sendNewUser, setItem } from '../../transport';

const RegistartionComponent = (): JSX.Element => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userDoublePassword, setuserDoublePassword] = useState('')

  const errorPassword = userPassword !== userDoublePassword || userPassword.length < 8 || userPassword.length > 16;
  const errorDoublePassword = userPassword !== userDoublePassword;
  const errorName = userName === '';
  const errorEmail = userEmail === '';

  const errorMessagePassword = userPassword.length < 8 ? 'Меньше 8 символов'
    : userPassword.length > 16 ? 'Больше 8 символов'
      : userPassword !== userDoublePassword ? 'Пароли не совпадают'
        : '';
  const errorMessageDoublePassword = userPassword !== userDoublePassword ? 'Пароли не совпадают' : ''
  const errorMessageName = 'Введите имя'
  const errorMessageEmail = 'Введите email'

  const Data: TUserSchema = {
    passwordHash: userPassword,
    photoBase64: '',
    coverBase64: '',
    name: userName,
    email: userEmail,
    location: '',
    dateBirthday: '',
    activity: [],
    specialization: [],
    price: 0,
    sex: '',
    experience: '',
    aboutMe: 'string',
    picturesBase64: []
  }

  const handleButtonClick = () => {
    sendNewUser(Data)
    navigate('/lk-creating');
  }

  setItem<string>('email', userEmail)
  return (
    <div
      className={styles.registrationContainer}
    >
      <h1 className={styles.header}>Регистрация</h1>
      <div
        className={styles.description}
      >
        Зарегистрируйте новый аккаунт на нашем сервисе и исспользуйте его бесплатно!
      </div>
      <div
        className={styles.inputsContainer}
      >
        <Input
          id="fio"
          label="ФИО"
          placeholder='Иванов Иван Иванович'
          type='text'
          value={userName}
          onCahge={event => setUserName(event.target.value)}
          error={errorName}
          errorMessage={errorMessageName}
        />
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
          label="Придумайте пароль"
          placeholder='Пароль содержит 6 знаков'
          type='password'
          value={userPassword}
          onCahge={event => setUserPassword(event.target.value)}
          error={errorPassword}
          errorMessage={errorMessagePassword}
        />
        <Input
          id="passwordRepeat"
          label="Повторите пароль"
          placeholder='Повторите пароль'
          type='password'
          value={userDoublePassword}
          onCahge={event => setuserDoublePassword(event.target.value)}
          error={errorDoublePassword}
          errorMessage={errorMessageDoublePassword}
        />
        <div
          className={styles.text}
        >
          Все поля обязательны для заполнения
        </div>
      </div>

      <div
        className={styles.buttonContainer}
      >
        <Button
          typeButton='blue'
          title='Регистрация'
          click={() => handleButtonClick()}
        />
        <Link to='' onClick={() => navigate(-1)}>
          <Button
            typeButton='empty'
            title='Отмена'
          />
        </Link>
      </div>
    </div>

  );
};

export default RegistartionComponent;

