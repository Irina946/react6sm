import { Link, useNavigate } from 'react-router-dom';
import Button from '../button/button';
import Input from '../input/input';
import styles from './entrance.module.css'
import { useEffect, useState } from 'react';
import { type TUserSchema, readUser, setItem } from '../../transport';

interface LocalStorage {
  email: string
}

interface AnswerNotFound {
  message: string;
}

const EntarnceComponent = (): JSX.Element => {


  const navigate = useNavigate()

  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const answer = { message: 'User not found' }
  const [precenceUser, setPrecenceUser] = useState(false)
  const [userFromBD, setUserFromBD] = useState<TUserSchema | AnswerNotFound>()
  useEffect(() => {
    const dataFromBD = readUser(userEmail)
    dataFromBD?.then(result => {
      setPrecenceUser(JSON.stringify(result) === JSON.stringify(answer))
      setUserFromBD(result)
    }).catch(error => {
      console.log(error)
    });
  }, [userEmail]);
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorPassword, setErrorPassword] =useState(false) 
  const errorMessageEmail = 'Такого пользователя не существует'

  const handleButtonClickEntrance = (): void => {
    if (!precenceUser) {
      if (userPassword === userFromBD!.passwordHash) {
        navigate('/lk-creating')
        setItem<string>('preferences', userEmail)
      } else {
        setErrorPassword(true)
      }
    } 
    if (precenceUser) {
      setErrorEmail(true)
    }
  }
  
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

