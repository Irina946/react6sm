import { Link } from 'react-router-dom'
import styles from './main.module.css'
import Button from '../../components/button/button'

export const Main = (): JSX.Element => {
  localStorage.clear()
  return (
    <div className={styles.MainContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.description}>
          Если хочешь найти хорошего исполнителя своих идей, то добро пожаловать к нам
        </div>
        <Link to='/customerFeed' className={styles.leftContainer}>
          <Button title='Найти креативщика' typeButton='main' />
        </Link>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.description}>
          Ищешь клиентов? Хочешь расширить партфолио? Тогда тебе к нам
        </div>
        <Link to='entarnce' className={styles.rightContainer}>
          <Button title='Присоединиться' typeButton='main' />
        </Link>
      </div>
    </div>
  )
}
