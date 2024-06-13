/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './LKcreating.module.css'
import Button from '../../components/button/button'
import { ActivityBlock } from '../../components/activityBlock/activityBlock'
import { SpecializationBlock } from '../../components/specializationBlock/specializationBlock'
import { DropDownLK } from '../../components/dropDownLk/dropDownLK';
import Modal from 'react-modal';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TUserSchema, getItem } from '../../transport'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { readUser, sendUser, deleteUser } from '../../redux/features/userSlice';

export const LKCreating = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

  const [modalOpen, setOpenModal] = useState(false);
  const emailFromLocalStorage = getItem('email')
  const deleteProfile = (email: string | ''): void => {
    dispatch(deleteUser(email))
    navigate('..')
  }

  useEffect(() => {
    dispatch(readUser(emailFromLocalStorage));
  }, [dispatch, emailFromLocalStorage]);

  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    if (user?.picturesBase64) {
      setPhotos(user.picturesBase64);
    }
  }, [user?.picturesBase64]);

  const [photo, setPhoto] = useState<string>('')
  const uploadPhotos = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        setPhoto(result);
      }
    };
  }

  const Data: TUserSchema = {
    passwordHash: user?.passwordHash || '',
    photoBase64: user?.photoBase64 || '',
    coverBase64: user?.coverBase64 || '',
    name: user?.name || '',
    email: user?.email || '',
    location: user?.location || '',
    dateBirthday: user?.dateBirthday || '',
    activity: user?.activity || [],
    specialization: user?.specialization || [],
    price: user?.price || 0,
    sex: user?.sex || '',
    experience: user?.experience || '',
    aboutMe: user?.aboutMe || '',
    picturesBase64: photos
  }

  const handleButtonClick = () => {
    if (photo !== '') {
      setPhotos(prevPhotos => [photo, ...prevPhotos]);
      setPhoto('');
      setOpenModal(false);
      dispatch(sendUser({ ...Data, picturesBase64: [photo, ...photos] }));
      navigate(0);
    }}

    return (
      <>
        <div className={styles.containerLKOutsideTop}>
          <img className={styles.containerLKOutsideTop} src={user?.coverBase64} />
          <div className={styles.containerLKInsideTop}>
            <div className={styles.avatarContainer}>
              <img className={styles.avatarImg} src={user?.photoBase64} />
            </div>
            <div className={styles.informationContainer}>
              <div className={styles.nameContainer}>{user?.name}</div>
              <div className={styles.locationContainer}>Российская Федерация, г. {user?.location} </div>
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
                click={() => deleteProfile(emailFromLocalStorage)}
              />
            </div>
          </div>
        </div>
        <div className={styles.containerLKBottom}>
          <div className={styles.containerInformationBottom}>
            {user?.activity?.map((activity: string, idx: number) => (
              <div key={idx}>
                <ActivityBlock activity={activity} />
              </div>
            ))}
            Специализация:
            {user?.specialization?.map((specialization: string, idx: number) => (
              idx < 2 ?
                <div key={idx}>
                  <SpecializationBlock title={specialization} />
                </div>
                : <div key={idx}></div>

            ))}
            <DropDownLK list={user?.specialization || []} />
          </div>
        </div>
        <div className={styles.botomContainer}>
          Коллекции
          <div className={styles.bottomPhotoContainer}>
            <button onClick={() => setOpenModal(true)} className={styles.containerPhotoNew}>
            </button>
            {user?.picturesBase64?.map((photo: string, idx: number) => (
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

