import { useState } from 'react';
import styles from './dropDownLK.module.css';
import clsx from 'clsx';

interface DropDownLKProps {
  list: string[]
}

export const DropDownLK = (props: DropDownLKProps): JSX.Element => {
  const listEntrance = props.list
  const [dropdownState, setDropdownState] = useState({ open: false });

  const arrow = dropdownState.open ? styles.top : ''

  const handleDropdownClick = () =>
    setDropdownState({ open: !dropdownState.open });
  return (
    <div
      className={clsx(styles.dropDownLK)}>
      <button
        className={clsx(styles.buttonDropDown, arrow)}
        onClick={handleDropdownClick}
      >
        Подробнее
      </button>
      {dropdownState.open && (
        <div className={styles.dropdown}>
          <ul className={styles.UlDropdown}>
            {listEntrance.map((entrance: string) => (
              <li className={styles.liDropdown}>{entrance}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


