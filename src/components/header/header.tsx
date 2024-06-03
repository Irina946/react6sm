import { Link } from 'react-router-dom'
import styles from './header.module.css'


export const Header = (): JSX.Element => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.leftContainer}>
        <Link to=".." className={styles.logo}>
          <img src='https://storage.yandexcloud.net/project-backet/Logo.svg' />
        </Link>
      </div>
    </div>
  )
}

