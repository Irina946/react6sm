import { Link } from 'react-router-dom'
import styles from './main.module.css'

export const Main = (): JSX.Element => {
  return (
    <div className={styles.MainContainer}>
      <div className={styles.leftContainer}>
        <Link to='registration' className={styles.leftContainer}>
          Найти креативщика
        </Link>
      </div>
      <div className={styles.rightContainer}>
        <Link to='registration' className={styles.rightContainer}>
          Присоединиться
        </Link>
      </div>
    </div>
  )
}
