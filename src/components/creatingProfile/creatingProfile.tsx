/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint no-use-before-define: 0 */
import { useEffect, useState } from 'react';
import Button from '../button/button';
import DropDown from '../drop-down/drop-down';
import Input from '../input/input';
import styles from './creatingProfile.module.css'
import { Radio } from '../checkbox/checkbox';
import { Link, useNavigate } from 'react-router-dom';
import Background from '../../image/backgroundGrey.png';
import data from '../../data.json';
import { TUserSchema, getItem, readUser, sendUser } from '../../transport';
import Multiselect from 'multiselect-react-dropdown';


const CreatingProfileComponent = (): JSX.Element => {
  const navigate = useNavigate();
  const emailFromLocalStorage = getItem('email')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userLocation, setUserLocation] = useState('')
  const [userDate, setUserDate] = useState('')
  const [userAbout, setUserAbout] = useState('')
  const [userPrice, setUserPrice] = useState('');
  const [sexUser, setSexUser] = useState('');
  const [experience, setExperienceValue] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [imageFile, setImageFile] = useState<string>('');
  const [imageCover, setImageCover] = useState<string>('');
  const [photos, setPhotos] = useState<string[]>([])

  useEffect(() => {
    console.log(emailFromLocalStorage)
    const dataFromBD = readUser(emailFromLocalStorage)
    dataFromBD?.then(result => {
      setUserName(result.name);
      setUserEmail(result.email);
      setUserLocation(result.location);
      setUserDate(result.dateBirthday);
      setUserPrice(result.price);
      setSexUser(result.sex)
      setExperienceValue(result.experience)
      setUserAbout(result.aboutMe)
      setUserPassword(result.password)
      setImageFile(result.photoBase64)
      setImageCover(result.coverBase64)
      setPhotos(result.picturesBase64)
    }).catch(error => {
      console.log(error)
    });
  }, []);


  const dataSet = data.models
  const [activeData, specializationData, experienceData] = [...dataSet]

  const [optionActiveData, setOptionActiveData] = useState<{ name: string, id: string }[]>([])
  const onActiveSelect = (selectedList: { name: string, id: string }[], _selectedItem: { name: string, id: string }) => {
    setOptionActiveData(selectedList);
    let value = "";
    selectedList.forEach(element => {
      value = value == "" ? element.name : value + "," + element.name;
    });
  }
  const onRemoveActive = (selectedList: { name: string, id: string }[], _removedItem: { name: string, id: string }) => {
    setOptionActiveData(selectedList);
    let value = "";
    selectedList.forEach(element => {
      value = value == "" ? element.name : value + "," + element.name;
    });
  }

  const [optionSpecializationData, setOptionSpecializationData] = useState<{ name: string, id: string }[]>([])
  const onSpecializationSelect = (selectedList: { name: string, id: string }[], _selectedItem: { name: string, id: string }) => {
    setOptionSpecializationData(selectedList);
    let value = "";
    selectedList.forEach(element => {
      value = value == "" ? element.name : value + "," + element.name;
    });
  }
  const onRemoveSpecialization = (selectedList: { name: string, id: string }[], _removedItem: { name: string, id: string }) => {
    setOptionSpecializationData(selectedList);
    let value = "";
    selectedList.forEach(element => {
      value = value == "" ? element.name : value + "," + element.name;
    });
  }
  console.log(optionSpecializationData.map((item: { name: string, id: string }) => (item.id)))
  const selectedExperience = experienceData.content.find((item) => item.id === experience)
  const handleExperienceSelect = (value: string) => {
    setExperienceValue(value)
  }

  const sexBD = sexUser === 'man' ? true : false

  const sexFromBD = {
    man: sexBD,
    woman: !sexBD
  }
  const [theme, setTheme] = useState(sexFromBD)

  const onChangeTheme = (e: { target: { name: unknown; }; }) => {
    const { name } = e.target
    if (name === 'man') {
      setTheme({ man: true, woman: false })
    }
    if (name === 'woman') {
      setTheme({ man: false, woman: true })
    }
  }

  const sex = theme.man ? 'man' : 'woman'

  const uploadPic = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        setImageFile(result);
      }
    };
  }

  const uploadCover = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        setImageCover(result);
      }
    };
  }



  const Data: TUserSchema = {
    passwordHash: userPassword,
    photoBase64: imageFile,
    coverBase64: imageCover,
    name: userName,
    email: userEmail,
    location: userLocation,
    dateBirthday: userDate,
    activity: optionActiveData.map((item: { name: string, id: string }) => (item.id)),
    specialization: optionSpecializationData.map((item: { name: string, id: string }) => (item.id)),
    price: Number(userPrice),
    sex: sex,
    experience: experience,
    aboutMe: userAbout,
    picturesBase64: photos
  }

  const handleButtonClick = () => {
    sendUser(Data)
    navigate('/lk-creating')
  }


  return (
    <div
      className={styles.creatingProfileContainer}
    >
      <div className={styles.imagesContainer}>
        <div className={styles.photoProfile}>
          <img className={styles.photoProfile} src={imageFile || Background} />
        </div>
        <div className={styles.cover}>
          {imageCover ? <img className={styles.coverImage} src={imageCover} /> : <p>Вы можете загрузить обложку к своему профилю</p>}

        </div>
        <div className={styles.hrefContainer}>
          <input
            id='add-photo'
            className={styles.inputPhoto}
            type='file'
            accept='image/png, image/jpg, image/jpeg'
            onChange={uploadPic}
          />
          <label htmlFor='add-photo' className={styles.uploadPhoto}>Загрузите файл</label>
        </div>
        <div className={styles.hrefContainer}>
          <input
            id='add-cover'
            className={styles.inputPhoto}
            type='file'
            accept='image/png, image/jpg, image/jpeg'
            onChange={uploadCover}
          />
          <label htmlFor='add-cover' className={styles.uploadPhoto}>Загрузить обложку</label>
        </div>
      </div>
      <div
        className={styles.inputsContainer}
      >
        <Input
          id="fio"
          label="Полное имя"
          placeholder='Иванов Иван Иванович'
          size='small'
          type='text'
          value={userName}
          onCahge={event => setUserName(event.target.value)}
        />
        <Input
          id="e-mail"
          label="E-mail"
          placeholder='mail@mail.ru'
          size='small'
          type='mail'
          value={userEmail}
          onCahge={event => setUserEmail(event.target.value)}
        />
        <Input
          id="location"
          label="Локация"
          placeholder='Страна, город'
          size='small'
          type='text'
          value={userLocation}
          onCahge={event => setUserLocation(event.target.value)}
        />
        <Input
          id="date_birth"
          label="Дата рождения"
          placeholder='дд.мм.гггг'
          size='small'
          type='date'
          value={userDate}
          onCahge={event => setUserDate(event.target.value)}
        />
        <Multiselect
          options={activeData.content}
          onSelect={onActiveSelect}
          onRemove={onRemoveActive}
          displayValue="name"
          placeholder='Выберите деятельность'
        />
        <Multiselect
          options={specializationData.content}
          onSelect={onSpecializationSelect}
          onRemove={onRemoveSpecialization}
          displayValue="name"
          placeholder='Выберите специализацию'
        />
        <Input
          id="price"
          label="Цена работы в рублях"
          placeholder='1000'
          size='small'
          type='number'
          value={userPrice}
          onCahge={event => setUserPrice(event.target.value)}
        />
        <div className={styles.sex}>
          <Radio
            text='Муж'
            id='man'
            name='man'
            value='man'
            onChange={onChangeTheme}
            checked={theme.man} />
          <Radio
            text='Жен'
            id='woman'
            name='woman'
            value='woman'
            onChange={onChangeTheme}
            checked={theme.woman} />
        </div>
        <DropDown
          options={experienceData.content}
          selected={selectedExperience || null}
          onChange={handleExperienceSelect}
          placeholder='Опыт(лет)'
          label='Выберите'
          size='small'
        />
        <label >
          <div className={styles.textAreaLabel}>
            <div><p>Расскажите о себе&nbsp;</p></div>
            <div className={styles.optional}> — Необязательное</div>
          </div>
          <textarea
            className={styles.textArea}
            value={userAbout}
            onChange={
              (e) =>
                setUserAbout(e.target.value)
            }
          >
          </textarea>
        </label>
      </div>
      <div
        className={styles.buttonContainer}
      >
        <Button
          typeButton='blue'
          title='Сохранить'
          click={() => handleButtonClick()}
        />
        <Link to='/lk-creating'>
          <Button
            typeButton='empty'
            title='Отмена'
          />
        </Link>
      </div>
    </div>

  );
};

export default CreatingProfileComponent;
