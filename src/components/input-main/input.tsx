import styles from './input.module.css';
import clsx from 'clsx';

interface InputProps {
  id: string
  label: string
  placeholder: string
  size?: 'big' | 'small'
  type: string
  view?: string
}

const Input = (props: InputProps): JSX.Element => {
  const typeSize = props.size === 'big' ? styles.big :
    props.size === 'small' ? styles.small : '';
  const typeView = props.view === 'main' ? styles.inputMain : ''
  return (
    <label
      className=
      {
        clsx(
          styles.myInput,
          typeView
        )
      }
    >
      {props.label}
      <input
        id={props.id}
        placeholder={props.placeholder}
        className={clsx(typeSize)}
        type={props.type}
      />
    </label>
  );
};

export default Input;
