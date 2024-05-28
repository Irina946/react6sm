import styles from './LKcreating.module.css'
import avatar from '../../image/avatar.png'
import Button from '../../components/button/button'
import { ActivityBlock } from '../../components/activityBlock/activityBlock'
import { SpecializationBlock } from '../../components/specializationBlock/specializationBlock'
import { DropDownLK } from '../../components/dropDownLk/dropDownLK'


export const LKCreating = (): JSX.Element => {

  const dataEntrance = ['Еда', 'Свадьба', 'Уличная', 'Студийная', 'Детская']

  return (
    <>
      <div className={styles.containerLKOutsideTop}>
        <div className={styles.containerLKInsideTop}>
          <div className={styles.avatarContainer}>
            <img className={styles.avatarImg} src={avatar} />
          </div>
          <div className={styles.informationContainer}>
            <div className={styles.nameContainer}>Мария Иванова</div>
            <div className={styles.locationContainer}>Российская Федерация, г. Уфа </div>
          </div>
          <div className={styles.buttonsContainer}>
            <Button
              typeButton='blue'
              title='Редактировать'
              size='small'
            />
            <Button
              typeButton='empty'
              title='Сообщения'
              size='small'
            />
          </div>
        </div>
      </div>
      <div className={styles.containerLKBottom}>
        <div className={styles.containerInformationBottom}>
          <ActivityBlock activity='photo' />
          <ActivityBlock activity='video' />
          <ActivityBlock activity='model' />
          Специализация:
          <SpecializationBlock title='Еда' />
          <SpecializationBlock title='Свадьба' />
          <DropDownLK list={dataEntrance}/>
        </div>
      </div>
    </>
  )
}
