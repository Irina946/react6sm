import { useState } from 'react';
import Button from '../button/button';
import DropDown from '../drop-down/drop-down';
import Input from '../input/input';
import styles from './creatingProfile.module.css'
import { Radio } from '../checkbox/checkbox';
import { Link } from 'react-router-dom';
import data from '../../data.json';
import { TUserSchema, sendUser } from '../../transport';



const CreatingProfileComponent = (): JSX.Element => {
  const [active, setActiveValue] = useState('');
  const handleActiveSelect = (value: string) => {
    setActiveValue(value)
  }

  const [specialization, setSpecializationValue] = useState('');
  const handleSpecializationSelect = (value: string) => {
    setSpecializationValue(value)
  }

  const [experience, setExperienceValue] = useState('');
  const handleExperienceSelect = (value: string) => {
    setExperienceValue(value)
  }

  const dataSet = data.models
  const [activeData, specializationData, experienceData] = [...dataSet]



  const selectedActive = activeData.content.find((item) => item.value === active)
  const selectedSpecialization = specializationData.content.find((item) => item.value === specialization)
  const selectedExperience = experienceData.content.find((item) => item.value === experience)

  const [theme, setTheme] = useState({ man: false, woman: false })

  const onChangeTheme = (e) => {
    const { name } = e.target
    if (name === 'man') {
      setTheme({ man: true, woman: false })
    }
    if (name === 'woman') {
      setTheme({ man: false, woman: true })
    }
  }

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userLocation, setUserLocation] = useState('')
  const [userDate, setUserDate] = useState('')
  // const [userAbout, setUserAbout] = useState('')
  const [userPrice, setUserPrice] = useState('')

  const sex = theme.man ? 'мужчина' : 'женщина'


  const Data: TUserSchema = {
    passwordHash: '',
    photoBase64: '',
    coverBase64: '',
    name: userName,
    email: userEmail,
    location: userLocation,
    dateBirthday: userDate,
    activity: active.split(' '),
    specialization: specialization.split(' '),
    price: Number(userPrice),
    sex: sex,
    experience: experience,
    aboutMe: 'string',
    picturesBase64: ['string[]', 'fggghh']
  }

  // const handleButtonClick = () => {
  //   sendUser(Data)
  // }

  return (
    <div
      className={styles.creatingProfileContainer}
    >
      <div className={styles.imagesContainer}>
        <div className={styles.photoProfile}></div>
        <div className={styles.cover}>
          Вы можете загрузить обложку к своему профилю
        </div>
        <div className={styles.hrefContainer}>
          <a>Загрузить фото</a>
        </div>
        <div className={styles.hrefContainer}>
          <a>Загрузить обложку</a>
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
        <DropDown
          options={activeData.content}
          selected={selectedActive || null}
          onChange={handleActiveSelect}
          placeholder='Выберите деятельность'
          label='Деятельность'
        />
        <DropDown
          options={specializationData.content}
          selected={selectedSpecialization || null}
          onChange={handleSpecializationSelect}
          placeholder='Выберите специализацию'
          label='Специализация'
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
          <textarea className={styles.textArea}>
          </textarea>
        </label>
      </div>
      <div
        className={styles.buttonContainer}
      >
        <Button
          typeButton='blue'
          title='Регистрация'
          click={() => sendUser(Data)}
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

