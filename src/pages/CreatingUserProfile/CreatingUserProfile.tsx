import styles from './CreatingUsersProfile.module.css'
import { ActivityBlock } from '../../components/activityBlock/activityBlock'
import { SpecializationBlock } from '../../components/specializationBlock/specializationBlock'
import { DropDownLK } from '../../components/dropDownLk/dropDownLK';
import { TUserSchema } from '../../transport'

interface dataProps {
  data: TUserSchema
}

export const CreatingUserProfile = (props: dataProps): JSX.Element => {
  const { data } = props
  return (
    <>
      <div className={styles.containerLKOutsideTop}>
        <img className={styles.containerLKOutsideTop} src={data.coverBase64} />
        <div className={styles.containerLKInsideTop}>
          <div className={styles.avatarContainer}>
            <img className={styles.avatarImg} src={data.photoBase64} />
          </div>
          <div className={styles.informationContainer}>
            <div className={styles.nameContainer}>{data.name}</div>
            <div className={styles.emailContainer}>
              Email: <a
                className={styles.email_link}
                href={`mailto:${data.email}`}
                title='Написать на почту'>
                {data.email}
              </a>
            </div>
            <div className={styles.locationContainer}>Российская Федерация, г. {data.location} </div>
          </div>
          {data.aboutMe !== '' ? <div className={styles.containerAboutMe}>
            <div className={styles.aboutMeTitle}>Немного обо мне:</div>
            {data.aboutMe}
          </div> : <></>}
          
        </div>
      </div>
      <div className={styles.containerLKBottom}>
        <div className={styles.containerInformationBottom}>
          {data.activity.map((activity: string, idx: number) => (
            <div key={idx}>
              <ActivityBlock activity={activity} />
            </div>
          ))}
          Специализация:
          {data.specialization.map((specialization: string, idx: number) => (
            idx < 1 ?
              <div key={idx}>
                <SpecializationBlock title={specialization} />
              </div>
              : <div key={idx}></div>

          ))}
          <DropDownLK list={data.specialization} />
        </div>
      </div>
      <div className={styles.botomContainer}>
        Коллекции
        <div className={styles.bottomPhotoContainer}>
          {data.picturesBase64?.map((photo: string, idx: number) => (
            <div
              className={styles.containerPhoto}
              key={idx}>
              <img className={styles.photo} src={photo} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

