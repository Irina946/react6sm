import styles from './input.module.css';
import clsx from 'clsx';

interface InputProps {
  id: string
  label: string
  placeholder: string
  error?: boolean
  errorMessage?: string
  size?: 'big' | 'small'
  type: string
}

const Input = (props: InputProps): JSX.Element => {
  let error = '';
  let stylesErrorMessage = styles.invisible;
  const typeSize = props.size === 'big' ? styles.big :
    props.size === 'small' ? styles.small : '';
  if (props.error) {
    error = styles.error
    stylesErrorMessage = styles.visible
  }
  return (
    <label
      className=
      {
        clsx(
          styles.myInput,
          error,
        )
      }
    >
      {props.label}
      <input
        id={props.id}
        placeholder={props.placeholder}
        className={clsx(error, typeSize)}
        type={props.type}
      />
      <div className={stylesErrorMessage}>{props.errorMessage}</div>
    </label>

  );
};

export default Input;
