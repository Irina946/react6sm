import { useState } from 'react';
import { TUserSchema } from '../../transport';
import { ActivityBlock } from '../activityBlock/activityBlock';
import styles from './user-card.module.css';
import Modal from 'react-modal'
import { CreatingUserProfile } from '../../pages/CreatingUserProfile/CreatingUserProfile';

interface UserCardProps {
  user: TUserSchema
}

export function calculateAge(birthDate: string): number {

  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();
  const dayDifference = today.getDate() - birth.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}

function getAgeString(age: number) {
  if (age % 10 === 1 && age % 100 !== 11) {
    return `${age} год`;
  } else if (age % 10 >= 2 && age % 10 <= 4 && (age % 100 < 10 || age % 100 >= 20)) {
    return `${age} года`;
  } else {
    return `${age} лет`;
  }
}



export const UserCard = (props: UserCardProps) => {
  const [modalOpen, setOpenModal] = useState(false);
  const { user } = props;

  const fullAge: number = calculateAge(user.dateBirthday);
  return (
    <>
      <button
        className={styles.container}
        onClick={() => setOpenModal(true)}
      >
        <img
          src={user.photoBase64}
          alt='user avatar'
          className={styles.user_avatar}
        />
        <div className={styles.main_container}>
          <span className={styles.user_name}>
            {user.name}
          </span>
          <div className={styles.activity_container}>
            {user.activity.map((activity: string, id: number) => (
              <span
                className={styles.standart_span}
                key={id}>
                <ActivityBlock activity={activity} />
              </span>
            ))}
          </div>
          <div className={styles.location_cotnainer}>
            <span className={styles.location_span}>
              {user.location}
            </span>
          </div>
          <span className={styles.standart_span}>
            Возраст: {getAgeString(fullAge)}
          </span>
          <div className={styles.price_container}>
            <span className={styles.standart_span}>
              Час работы: {user.price}&#8381;
            </span>
          </div>
          <div className={styles.email_container}>
            <a
              className={styles.email_link}
              href={`mailto:${user.email}`}
              title='Написать на почту'>
              {user.email}
            </a>
          </div>
        </div>
      </button>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setOpenModal(false)}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          }
        }}
        className={styles.modalProfile}
      >
        <CreatingUserProfile data={user} />
      </Modal>

    </>
  )
}
