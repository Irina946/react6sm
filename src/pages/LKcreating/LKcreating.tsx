import styles from './LKcreating.module.css'
import avatar from '../../image/avatar.png'
import Button from '../../components/button/button'
import { ActivityBlock } from '../../components/activityBlock/activityBlock'
import { SpecializationBlock } from '../../components/specializationBlock/specializationBlock'
import { DropDownLK } from '../../components/dropDownLk/dropDownLK';
import Modal from 'react-modal';
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const LKCreating = (): JSX.Element => {

  const dataEntrance = ['Еда', 'Свадьба', 'Уличная', 'Студийная', 'Детская'];

  const [modalOpen, setOpenModal] = useState(false);
  // const [fileList, setFileList] = useState([]);

  // const updateFileList = (file: Object) => {
  //   setFileList([...fileList, file]);
  // }

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
            <Link to='/create-profile'>
              <Button
                typeButton='blue'
                title='Редактировать'
                size='small'
              />
            </Link>
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
          <DropDownLK list={dataEntrance} />
        </div>
      </div>
      <div className={styles.botomContainer}>
        Коллекции
        <div className={styles.bottomPhotoContainer}>
          <button onClick={() => setOpenModal(true)} className={styles.containerPhotoNew}>
          </button>
          <div className={styles.containerPhoto}>
            <img className={styles.photo} src='src\image\lk\collage-from-different-pictures-of-tasty-food-400-102813299.jpg' />
          </div>
          <div className={styles.containerPhoto}>
            <img className={styles.photo} src='src\image\lk\food.png' />
          </div>
          <div className={styles.containerPhoto}>
            <img className={styles.photo} src='src\image\lk\KollazhBig.png' />
          </div>
          <div className={styles.containerPhoto}>
            <img className={styles.photo} src='src\image\lk\tsvety_fioletovyj_rastenie_107518_300x188.jpg' />
          </div>
        </div>
      </div>
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
        className={styles.addPhoto_modal}>

        <div className={styles.labelAddPhotoMadol}>
          Загрузите фото в формате .jpg, .png или .jpeg
        </div>
        <div>
          <input id='add-photo' className={styles.inputPhoto} type='file' accept='image/png, image/jpg, image/jpeg' multiple></input>
          <label htmlFor='add-photo' className={styles.uploadPhoto}>Загрузите файл</label>
        </div>
      </Modal>
    </>
  )
}

// onChange={(value) => updateFileList(value.target.files[0])} 
