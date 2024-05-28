import { FormEventHandler, type MouseEventHandler } from 'react';
import styles from './button.module.css';
import clsx from 'clsx';
// import { TUserSchema } from '../../transport';

interface ButtonProps {
  typeButton: 'blue' | 'empty' | 'main' | 'search'
  title: string
  click?: MouseEventHandler<HTMLButtonElement> | FormEventHandler<HTMLButtonElement> | undefined | FormEventHandler<HTMLButtonElement>;
  size?: 'small'
}

const Button = (props: ButtonProps): JSX.Element => {
  const typeButtonClass = props.typeButton === 'blue'
    ? styles.blue
    : props.typeButton === 'empty' ? styles.empty
      : props.typeButton === 'main' ? styles.main
        : props.typeButton === 'search' ? styles.search : ''
  const sizeButton = props.size === 'small' ? styles.small : ''
  return (
    <button
      className={clsx(
        styles.myButton,
        typeButtonClass,
        sizeButton
      )}
      onClick={props.click}
    >
      {props.title}
    </button>
  );
};

export default Button;
