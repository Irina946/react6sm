import Button from '../button/button';
import Input from '../input/input';
import styles from './registration.module.css'



const RegistartionComponent = (): JSX.Element => {
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
        />
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
        <Input
          id="passwordRepeat"
          label="Повторите пароль"
          placeholder='Повторите пароль'
          type='password'
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
        />
        <Button
          typeButton='empty'
          title='Отмена'
        />
      </div>
    </div>

  );
};

export default RegistartionComponent;

