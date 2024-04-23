import styles from "./checkbox.module.css";

interface Props {
  id: string,
  name?: string,
  title: string,
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void
}

const Checkbox = (props: Props) => {
  return (
    <div>
      <input
        id={props.id}
        type="checkbox"
        name={props.name}
        className={styles.customCheckbox}
        onChange={props.onChange}
      />
      <label
        className={styles.label}
        htmlFor={props.id}
      >
        {props.title}
      </label>
    </div>
  )
}

export default Checkbox;
