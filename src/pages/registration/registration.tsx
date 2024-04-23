import RegistartionComponent from "../../components/registration/registration"
import styles from './registration.module.css'

export const Registration = (): JSX.Element => {
  return(
    <div className={styles.RegistrationContainer}>
      <RegistartionComponent />
    </div>
  )
}
