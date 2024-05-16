import { type MouseEventHandler } from 'react';
import styles from './button.module.css';
import clsx from 'clsx';

interface ButtonProps {
  typeButton: 'blue' | 'empty' | 'main'
  title: string
  click?: MouseEventHandler<HTMLButtonElement> | undefined
}

const Button = (props: ButtonProps): JSX.Element => {
  const typeButtonClass = props.typeButton === 'blue'
    ? styles.blue
    : props.typeButton === 'empty' ? styles.empty 
    : props.typeButton == 'main' ? styles.main : ''
  return (
    <button
      className={clsx(
        styles.myButton,
        typeButtonClass,
      )}
      onClick={props.click}
    >
      {props.title}
    </button>
  );
};

export default Button;
