import { useRef, useState, useEffect, MouseEventHandler } from 'react';
import styles from './drop-down.module.css'
import arrowDown from '../../image/arrow.png'
import arrowMain from '../../image/ArrowMain.svg'
import clsx from 'clsx';

type Option = {
  name: string,
  id: string
};

type SelectProps = {
  selected: Option | null;
  options: Option[];
  placeholder?: string;
  mode?: 'rows' | 'cells';
  status?: 'default' | 'invalid';
  onChange?: (selected: Option['id']) => void;
  onClose?: () => void;
  label: string;
  size?: 'small';
  view?: 'main';
  error?: boolean;
  errorMessage?: string
};

type OptionProps = {
  option: Option;
  onClick: (id: Option['id']) => void;
}

const Option = (props: OptionProps): JSX.Element => {
  const {
    option: { id, name },
    onClick
  } = props

  const optionRef = useRef<HTMLLIElement>(null)

  const handleClick =
    (clickedValue: Option['id']): MouseEventHandler<HTMLLIElement> =>
      () => {
        onClick(clickedValue)
      }

  useEffect(() => {
    const option = optionRef.current;
    if (!option) return;

    const handleEnterPress = (event: KeyboardEvent) => {
      if ((document.activeElement === option) && event.key === 'Enter') {
        onClick(id);
      }
    }

    option.addEventListener('keydown', handleEnterPress);

    return () => {
      option.removeEventListener('keydown', handleEnterPress);
    };
  }, [id, onClick]);

  return (
    <li
      className={styles.option}
      value={id}
      onClick={handleClick(id)}
      tabIndex={0}
      ref={optionRef}
    >
      {name}
    </li>
  )
}

const DropDown = (props: SelectProps): JSX.Element => {
  const errorModule = props.error ? styles.error : ''
  const displayNone = !props.error ? styles.displayNone : ''
  const {
    mode = 'rows',
    options,
    placeholder,
    status = 'default',
    selected,
    onChange,
    onClose,
    label,
    size,
    view
  } = props
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  let small = null
  if (size === 'small') {
    small = styles.small
  }
  const typeView = view === 'main' ? arrowMain : arrowDown;
  const color = view === 'main' ? styles.colorMain : '';
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        isOpen && onClose?.();
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const placeholderEl = placeholderRef.current;
    if (!placeholderEl) return;

    const handleClick = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setIsOpen((prev) => !prev);
      }
    };

    placeholderEl.addEventListener('keydown', handleClick);

    return () => {
      placeholderEl.removeEventListener('keydown', handleClick);
    };
  }, []);

  const handleOptionClick = (id: Option['id']) => {
    setIsOpen(false);
    onChange?.(id);
  };
  const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={clsx(styles.label, color, errorModule)}>
      {label}
      <div
        className={clsx(styles.selectWrapper, small, errorModule)}
        ref={rootRef}
        data-is-active={isOpen}
        data-mode={mode}
      >
        <div className={styles.arrow}>
          <img src={typeView} />
        </div>
        <div
          className={clsx(styles.placeholder, color, errorModule)}
          data-status={status}
          data-selected={!!selected?.id}
          onClick={handlePlaceHolderClick}
          role='button'
          tabIndex={0}
          ref={placeholderRef}
        >
          {selected?.name || placeholder}
        </div>
        {isOpen && (
          <ul className={styles.select}>
            {options.map((option) => (
              <Option
                key={option.id}
                option={option}
                onClick={handleOptionClick}
              />
            ))}
          </ul>
        )}
      </div>
      <div className={clsx(styles.errorMessage, displayNone)}>{props.errorMessage}</div>
    </div>)
}

export default DropDown;
