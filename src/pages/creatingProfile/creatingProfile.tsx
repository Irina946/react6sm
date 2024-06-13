import CreatingProfileComponent from "../../components/creatingProfile/creatingProfile"
import styles from './creatingProfile.module.css'

export const CreatingProfile = (): JSX.Element => {
  return (
    <div className={styles.CreatingProfileContainer}>
      <div>
        <div className={styles.headerContainer}>
          Редактирование профиля
        </div>
        <CreatingProfileComponent />
      </div>
    </div>
  )
}
