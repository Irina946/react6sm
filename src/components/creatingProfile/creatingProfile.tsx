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
import dataMultiply from '../../data.json';
import { TUserSchema, getItem } from '../../transport';
import { readUser, sendUser } from '../../redux/features/userSlice';
import Multiselect from 'multiselect-react-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';


const CreatingProfileComponent = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const emailFromLocalStorage = getItem('email')
  const [err, setErr] = useState<{
    onSpecializationSelect?: string;
    onActiveSelect?: string;
    userName?: string;
    userEmail?: string;
    userLocation?: string;
    userDate?: string;
    userPrice?: string;
    selectedExperience?: string;
  }>({})
  const [userName, setUserName] = useState<string>(user?.name || '')
  const [userEmail, setUserEmail] = useState<string>(user?.email || '')
  const [userLocation, setUserLocation] = useState<string>(user?.location || '')
  const [userDate, setUserDate] = useState<string>(user?.dateBirthday || '')
  const [userAbout, setUserAbout] = useState<string>(user?.aboutMe || '')
  const [userPrice, setUserPrice] = useState<string>(String(user?.price) || '');
  const [experience, setExperienceValue] = useState<string>(user?.experience || '');
  const [imageFile, setImageFile] = useState<string>(user?.photoBase64 || '');
  const [imageCover, setImageCover] = useState<string>(user?.coverBase64 || '');

  useEffect(() => {
    dispatch(readUser(emailFromLocalStorage));
  }, [dispatch, emailFromLocalStorage]);


const dataSet = dataMultiply.models
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
const selectedExperience = experienceData.content.find((item) => item.id === experience)
const handleExperienceSelect = (value: string) => {
  setExperienceValue(value)
}

const sexBD = user?.sex === 'man' ? true : false

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

const validate = () => {
  const errors: {
    onSpecializationSelect?: string;
    onActiveSelect?: string;
    userName?: string;
    userEmail?: string;
    userLocation?: string;
    userDate?: string;
    userPrice?: string;
    selectedExperience?: string;
  } = {};

  if (!userName) {
    errors.userName = 'Введите имя';
  }

  if (!userEmail) {
    errors.userEmail = 'Введите электронную почту';
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail)) {
    errors.userEmail = 'Некорректный формат электронной почты';
  }

  if (!userLocation) {
    errors.userLocation = 'Введите локацию';
  }

  if (!userDate) {
    errors.userDate = 'Введите дату рождения';
  }

  if (!userPrice) {
    errors.userPrice = 'Введите цену работы';
  } else if (isNaN(Number(userPrice))) {
    errors.userPrice = 'Цена работы должна быть числом';
  }

  if (!selectedExperience) {
    errors.selectedExperience = 'Выберите опыт работы';
  }

  if (onActiveSelect.length === 0) {
    errors.onActiveSelect = 'Выберите деятельность';
  }

  if (onSpecializationSelect.length === 0) {
    errors.onSpecializationSelect = 'Выберите специализацию';
  }
  setErr(errors)
  return errors;
};



const Data: TUserSchema = {
  passwordHash: user?.passwordHash || '',
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
  picturesBase64: user?.picturesBase64 || []
}

const errorMessageSpecialization = err.onSpecializationSelect ? styles.errorMessageMulty : ''
const errorMessageActivity = err.onActiveSelect ? styles.errorMessageMulty : ''

const handleButtonClick = () => {
  const errors = validate();
  if (Object.keys(errors).length === 0) {
    dispatch(sendUser(Data))
    navigate('/lk-creating')
  }
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
        error={err.userName !== undefined}
        errorMessage={err.userName}
      />
      <Input
        id="e-mail"
        label="E-mail"
        placeholder='mail@mail.ru'
        size='small'
        type='mail'
        value={userEmail}
        onCahge={event => setUserEmail(event.target.value)}
        error={err.userEmail !== undefined}
        errorMessage={err.userEmail}
      />
      <Input
        id="location"
        label="Локация"
        placeholder='Страна, город'
        size='small'
        type='text'
        value={userLocation}
        onCahge={event => setUserLocation(event.target.value)}
        error={err.userLocation !== undefined}
        errorMessage={err.userLocation}
      />
      <Input
        id="date_birth"
        label="Дата рождения"
        placeholder='дд.мм.гггг'
        size='small'
        type='date'
        value={userDate}
        onCahge={event => setUserDate(event.target.value)}
        error={err.userDate !== undefined}
        errorMessage={err.userDate}
      />
      <div className={styles.multiselectContainer}>
        <Multiselect
          options={activeData.content}
          onSelect={onActiveSelect}
          onRemove={onRemoveActive}
          displayValue="name"
          placeholder='Выберите деятельность'
        />
        <div className={errorMessageActivity}>{err.onActiveSelect}</div>
      </div>
      <div className={styles.multiselectContainer}>
        <Multiselect
          options={specializationData.content}
          onSelect={onSpecializationSelect}
          onRemove={onRemoveSpecialization}
          displayValue="name"
          placeholder='Выберите специализацию'
        />
        <div className={errorMessageSpecialization}>{err.onSpecializationSelect}</div>
      </div>
      <Input
        id="price"
        label="Цена работы в рублях"
        placeholder='1000'
        size='small'
        type='number'
        value={userPrice}
        onCahge={event => setUserPrice(event.target.value)}
        error={err.userPrice !== undefined}
        errorMessage={err.userPrice}
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
        label='Выберите опыт работы'
        size='small'
        error={err.selectedExperience !== undefined}
        errorMessage={err.selectedExperience}
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
          maxLength={150}
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
function dispatch(arg0: Promise<any>) {
  throw new Error('Function not implemented.');
}

