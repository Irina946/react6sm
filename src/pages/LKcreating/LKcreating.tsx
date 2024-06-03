import styles from './LKcreating.module.css'
import Button from '../../components/button/button'
import { ActivityBlock } from '../../components/activityBlock/activityBlock'
import { SpecializationBlock } from '../../components/specializationBlock/specializationBlock'
import { DropDownLK } from '../../components/dropDownLk/dropDownLK';
import Modal from 'react-modal';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleetUser, getItem, readUser } from '../../transport'

export const LKCreating = (): JSX.Element => {
  const navigate = useNavigate();

  const [modalOpen, setOpenModal] = useState(false);
  // const [fileList, setFileList] = useState([]);

  // const updateFileList = (file: Object) => {
  //   setFileList([...fileList, file]);
  // }
  const emailFromLocalStorage = getItem<{ email: string }>('email')
  const deleteProfile = (email: string | ''): void => {
    deleetUser(email)
    navigate('..')
  }

  const [userName, setUserName] = useState('')
  const [userLocation, setUserLocation] = useState('')
  const [activityUser, setActivityUser] = useState<string[]>(['model', 'video', 'photo'])
  const [specializationUser, setSpecializationUser] = useState<string[]>([])
  const [photoLK, setPhotoLK] = useState();
  const [imageCover, setImageCover] = useState<string>('');

  useEffect(() => {
    const promiseFromBD = readUser(emailFromLocalStorage.email)
    promiseFromBD?.then(async result => {
      setUserName(result.name)
      setUserLocation(result.location);
      setActivityUser(result.activity);
      setSpecializationUser(result.specialization)
      setPhotoLK(result.photoBase64)
      setImageCover(result.coverBase64)
    }).catch(error => {
      console.log(error)
    });
  }, []);



  return (
    <>
      <div className={styles.containerLKOutsideTop}>
        <img className={styles.containerLKOutsideTop} src={imageCover} />
        <div className={styles.containerLKInsideTop}>
          <div className={styles.avatarContainer}>
            <img className={styles.avatarImg} src={photoLK} />
          </div>
          <div className={styles.informationContainer}>
            <div className={styles.nameContainer}>{userName}</div>
            <div className={styles.locationContainer}>Российская Федерация, г. {userLocation} </div>
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
              title='Удалить'
              size='small'
              click={() => deleteProfile(emailFromLocalStorage.email)}
            />
          </div>
        </div>
      </div>
      <div className={styles.containerLKBottom}>
        <div className={styles.containerInformationBottom}>
          {activityUser?.map((activity: string, idx: number) => (
            <div key={idx}>
              <ActivityBlock activity={activity} />
            </div>
          ))}
          Специализация:
          {specializationUser.map((specialization: string, idx: number) => (
            idx < 2 ?
              <div key={idx}>
                <SpecializationBlock title={specialization} />
              </div>
              : <div key={idx}></div>

          ))}
          <DropDownLK list={specializationUser} />
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
