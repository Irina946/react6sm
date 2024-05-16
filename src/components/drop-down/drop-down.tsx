import { useRef, useState, useEffect, MouseEventHandler } from 'react';
import styles from './drop-down.module.css'
import arrowDown from '../../image/arrow.png'
import arrowMain from '../../image/arrowMain.png'
import clsx from 'clsx';

type Option = {
  title: string,
  value: string
};

type SelectProps = {
  selected: Option | null;
  options: Option[];
  placeholder?: string;
  mode?: 'rows' | 'cells';
  status?: 'default' | 'invalid';
  onChange?: (selected: Option['value']) => void;
  onClose?: () => void;
  label: string;
  size?: 'small';
  view?: 'main'
};

type OptionProps = {
  option: Option;
  onClick: (value: Option['value']) => void;
}

const Option = (props: OptionProps): JSX.Element => {
  const {
    option: { value, title },
    onClick
  } = props

  const optionRef = useRef<HTMLLIElement>(null)

  const handleClick =
    (clickedValue: Option['value']): MouseEventHandler<HTMLLIElement> =>
      () => {
        onClick(clickedValue)
      }

  useEffect(() => {
    const option = optionRef.current;
    if (!option) return;

    const handleEnterPress = (event: KeyboardEvent) => {
      if ((document.activeElement === option) && event.key === 'Enter') {
        onClick(value);
      }
    }

    option.addEventListener('keydown', handleEnterPress);

    return () => {
      option.removeEventListener('keydown', handleEnterPress);
    };
  }, [value, onClick]);

  return (
    <li
      className={styles.option}
      value={value}
      onClick={handleClick(value)}
      tabIndex={0}
      ref={optionRef}
    >
      {title}
    </li>
  )
}

const DropDown = (props: SelectProps): JSX.Element => {
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

  const handleOptionClick = (value: Option['value']) => {
    setIsOpen(false);
    onChange?.(value);
  };
  const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={clsx(styles.label, color)}>
      {label}
      <div
      className={clsx(styles.selectWrapper, small)}
      ref={rootRef}
      data-is-active={isOpen}
      data-mode={mode}
    >
      <div className={styles.arrow}>
        <img src={typeView} />
      </div>
      <div
        className={clsx(styles.placeholder, color)}
        data-status={status}
        data-selected={!!selected?.value}
        onClick={handlePlaceHolderClick}
        role='button'
        tabIndex={0}
        ref={placeholderRef}
      >
        {selected?.title || placeholder}
      </div>
      {isOpen && (
        <ul className={styles.select}>
          {options.map((option) => (
            <Option
              key={option.value}
              option={option}
              onClick={handleOptionClick}
            />
          ))}
        </ul>
      )}
    </div>
    </div>)
}

export default DropDown;
