import styles from './LKcreating.module.css'
import Button from '../../components/button/button'
import { ActivityBlock } from '../../components/activityBlock/activityBlock'
import { SpecializationBlock } from '../../components/specializationBlock/specializationBlock'
import { DropDownLK } from '../../components/dropDownLk/dropDownLK';
import Modal from 'react-modal';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TUserSchema, deleetUser, getItem, readUser, sendUser } from '../../transport'

export const LKCreating = (): JSX.Element => {
  const navigate = useNavigate();

  const [modalOpen, setOpenModal] = useState(false);
  const emailFromLocalStorage = getItem('email')
  const deleteProfile = (email: string | ''): void => {
    deleetUser(email)
    navigate('..')
  }

  const [userName, setUserName] = useState('')
  const [userLocation, setUserLocation] = useState('')
  const [activityUser, setActivityUser] = useState<string[]>(['model', 'video', 'photo'])
  const [specializationUser, setSpecializationUser] = useState<string[]>([])
  const [photoLK, setPhotoLK] = useState<string>('');
  const [imageCover, setImageCover] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('')
  const [userEmail, setUserEmail] = useState('')
  const [userDate, setUserDate] = useState('')
  const [userAbout, setUserAbout] = useState('')
  const [userPrice, setUserPrice] = useState('');
  const [sexUser, setSexUser] = useState('');
  const [experience, setExperienceValue] = useState('');
  const [photos, setPhotos] = useState<string[]>([])
  const [photo, setPhoto] = useState<string>('')
  const newPhoto = photos

  useEffect(() => {
    const promiseFromBD = readUser(emailFromLocalStorage)
    promiseFromBD?.then(async result => {
      console.log()
      setUserName(result.name)
      setUserLocation(result.location);
      setActivityUser(result.activity);
      setSpecializationUser(result.specialization)
      setPhotoLK(result.photoBase64)
      setImageCover(result.coverBase64)
      setUserEmail(result.email);
      setUserDate(result.dateBirthday);
      setUserPrice(result.price);
      setSexUser(result.sex)
      setExperienceValue(result.experience)
      setUserAbout(result.aboutMe)
      setUserPassword(result.password)
      setImageCover(result.coverBase64)
      setPhotos(result.picturesBase64)
    }).catch(error => {
      console.log(error)
    });
  }, []);

  const uploadPhotos = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setPhoto(reader.result);
  }

  const Data: TUserSchema = {
    passwordHash: userPassword,
    photoBase64: photoLK,
    coverBase64: imageCover,
    name: userName,
    email: userEmail,
    location: userLocation,
    dateBirthday: userDate,
    activity: activityUser,
    specialization: specializationUser,
    price: Number(userPrice),
    sex: sexUser,
    experience: experience,
    aboutMe: userAbout,
    picturesBase64: photos
  }

  const handleButtonClick = () => {
    newPhoto.unshift(photo);
    setPhotos(newPhoto)
    sendUser(Data)
    setPhoto('')
    setOpenModal(false)
  }

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
          {specializationUser?.map((specialization: string, idx: number) => (
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
          {photos?.map((photo: string, idx: number) => (
            <div
              className={styles.containerPhoto}
              key={idx}>
                <img className={styles.photo} src={photo} />
            </div>
          ))}
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
        <div className={styles.informartionButton}>
          <div className={styles.labelAddPhotoMadol}>
            Загрузите фото в формате .jpg, .png или .jpeg
          </div>
          <Button
            title='Сохранить'
            typeButton='blue'
            click={() => handleButtonClick()}
          />
          <Button
            title='Отменить'
            typeButton='empty'
            click={() => { setPhoto('') }}
          />
        </div>
        {photo !== '' ? <img src={photo} className={styles.newPhoto} /> :
          <div>
            <input
              id='add-photo'
              className={styles.inputPhoto}
              type='file' accept='image/png, image/jpg, image/jpeg'
              multiple
              onChange={uploadPhotos}
            />
            <label
              htmlFor='add-photo'
              className={styles.uploadPhoto}>
              Загрузите файл
            </label>


          </div>

        }

      </Modal>
    </>
  )
}

// onChange={(value) => updateFileList(value.target.files[0])} 
