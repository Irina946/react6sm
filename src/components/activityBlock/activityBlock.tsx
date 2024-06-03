import styles from './activityBlock.module.css';
import clsx from 'clsx';

interface ActivitryBlockProps {
  activity: string
}

export const ActivityBlock = (props: ActivitryBlockProps): JSX.Element => {
  const activityClass = props.activity === 'model' ? styles.modelClass
    : props.activity === 'photo' ? styles.photoClass
      : props.activity === 'video' ? styles.videoClass : ''
  const text = props.activity === 'model' ? 'Модель'
    : props.activity === 'photo' ? 'Фотограф'
      : props.activity === 'video' ? 'Видеограф' : ''

  return (
    <div
      className={clsx(styles.activityContainer, activityClass)}>
        {text}
    </div>
  );
};


