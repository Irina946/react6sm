import { Link, useNavigate } from 'react-router-dom';
import Button from '../button/button';
import Input from '../input/input';
import styles from './registration.module.css'
import { useEffect, useState } from 'react';
import { TUserSchema, encodePassword, setItem } from '../../transport';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { sendNewUser } from '../../redux/features/userSlice';

const RegistartionComponent = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.user.status);

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userDoublePassword, setuserDoublePassword] = useState('')

  const errorPassword = userPassword.length > 0
    && ((userPassword !== userDoublePassword && userDoublePassword.length > 0)
      || userPassword.length < 8
      || userPassword.length > 16);
  const errorDoublePassword = userDoublePassword.length > 0 && userPassword !== userDoublePassword;
  const errorEmail = userEmail.length > 0 && (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail));

  const errorMessagePassword = userPassword.length < 8 && userPassword.length > 0 ? 'Меньше 8 символов'
    : userPassword.length > 16 ? 'Больше 8 символов'
      : userPassword !== userDoublePassword && userPassword.length > 0 && userDoublePassword.length > 0 ? 'Пароли не совпадают'
        : '';
  const errorMessageDoublePassword = userPassword !== userDoublePassword && userDoublePassword.length > 0 ? 'Пароли не совпадают' : ''
  const errorMessageEmail = (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail)) && userEmail.length > 0 ? 'Некорректный e-mail' : ''
  const [er, setEr] = useState<{
    userName?: string,
    userEmail?: string,
    userPassword?: string,
    userDoublePassword?: string
  }>({})

  const validateRegistrationForm = (userName: string, userEmail: string, userPassword: string, userDoublePassword: string) => {
    const errors: {
      userName?: string;
      userEmail?: string;
      userPassword?: string;
      userDoublePassword?: string;
    } = {};

    if (!userName) {
      errors.userName = 'Введите имя';
    }

    if (!userEmail) {
      errors.userEmail = 'Введите email';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail)) {
      errors.userEmail = 'Некорректный email';
    }

    if (!userPassword) {
      errors.userPassword = 'Введите пароль';
    } else if (userPassword.length < 8) {
      errors.userPassword = 'Меньше 8 символов';
    } else if (userPassword.length > 16) {
      errors.userPassword = 'Больше 16 символов';
    }

    if (!userDoublePassword) {
      errors.userDoublePassword = 'Повторите пароль';
    } else if (userDoublePassword !== userPassword) {
      errors.userDoublePassword = 'Пароли не совпадают';
    }

    setEr(errors)

    return errors;
  };



  const Data: TUserSchema = {
    passwordHash: encodePassword(userPassword),
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
    aboutMe: '',
    picturesBase64: []
  }

  useEffect(() => {
    if (status === 'succeeded') {
      setItem<string>('email', userEmail);
      navigate('/lk-creating');
    } else if (status === 'failed') {
      setEr(prev => ({ ...prev, userEmail: 'Такой пользователь уже существует' }));
    }
  }, [status, navigate, userEmail]);

  const handleButtonClick = () => {
    const errors = validateRegistrationForm(userName, userEmail, userPassword, userDoublePassword);
    if (Object.keys(errors).length === 0) {
      dispatch(sendNewUser(Data));
    }
  };

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
          error={er.userName !== undefined}
          errorMessage={er.userName}
          required={true}
        />
        <Input
          id="email"
          label="Ваш e-mail"
          placeholder='mail@mail.ru'
          type='email'
          value={userEmail}
          onCahge={event => setUserEmail(event.target.value)}
          error={errorEmail || er.userEmail !== undefined}
          errorMessage={er.userEmail || errorMessageEmail}
          required={true}
        />
        <Input
          id="password"
          label="Придумайте пароль"
          placeholder='Пароль содержит 8 знаков'
          type='password'
          value={userPassword}
          onCahge={event => setUserPassword(event.target.value)}
          error={errorPassword || er.userPassword !== undefined}
          errorMessage={er.userPassword || errorMessagePassword}
          required={true}
        />
        <Input
          id="passwordRepeat"
          label="Повторите пароль"
          placeholder='Повторите пароль'
          type='password'
          value={userDoublePassword}
          onCahge={event => setuserDoublePassword(event.target.value)}
          error={errorDoublePassword || er.userDoublePassword !== undefined}
          errorMessage={er.userDoublePassword || errorMessageDoublePassword}
          required={true}
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

