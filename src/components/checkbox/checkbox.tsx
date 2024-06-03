import styles from "./checkbox.module.css";

interface radioButtonProps {
  id: string,
  name?: string,
  value: string,
  checked: boolean,
  text: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Radio = (props: radioButtonProps): JSX.Element => {
  return (
    <label htmlFor={props.id} className={styles.label}>
      {props.text}
      <input
        className={styles.customRadioButton}
        type="radio"
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        checked={props.checked}
      />
      <span className={styles.customRadioSpan} />
    </label>
  )
}

interface radioButtonProps {
  id: string,
  name?: string,
  value: string,
  checked: boolean,
  text: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const RadioButton = (props: radioButtonProps): JSX.Element => {
  return (
    <label htmlFor={props.id} className={styles.radioLabel}>
      <input
        className={styles.radioInput}
        type="radio"
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        checked={props.checked}
      />
      <span className={styles.customRadio} />
      {props.text}
    </label>
  )
}
