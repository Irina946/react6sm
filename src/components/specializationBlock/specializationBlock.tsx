import styles from './specializationBlock.module.css';

interface SpecializationBlockProps {
  title: string

}

export const SpecializationBlock = (props: SpecializationBlockProps): JSX.Element => {
  return (
    <div
      className={styles.specializationContainer}>
      {props.title}
    </div>
  );
};


