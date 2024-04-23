import EntarnceComponent from "../../components/entrance/entrance"
import styles from './entrance.module.css'

export const Entrance = (): JSX.Element => {
  return(
    <div className={styles.EntranceContainer}>
      <EntarnceComponent />
    </div>
  )
}
