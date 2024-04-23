import { useState } from 'react';
import Button from '../button/button';
import DropDown from '../drop-down/drop-down';
import Input from '../input/input';
import styles from './creatingProfile.module.css'
import Checkbox from '../checkbox/checkbox';



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

  const activeData = [
    {
      "title": "Фотограф",
      "value": "Photo"
    },
    {
      "title": "Видеограф",
      "value": "Video"
    },
    {
      "title": "Модель",
      "value": "Model"
    }
  ]

  const specializationData = [
    {
      "title": "Студийная",
      "value": "Studio"
    },
    {
      "title": "Уличная",
      "value": "Street"
    },
    {
      "title": "Детская",
      "value": "Childish"
    },
    {
      "title": "Свадебная",
      "value": "Wedding"
    },
    {
      "title": "Food",
      "value": "Food"
    },
    {
      "title": "Предметная",
      "value": "Subject"
    },
    {
      "title": "Fashion",
      "value": "Fashion"
    },
    {
      "title": "Архитектурная",
      "value": "Architectural"
    },
    {
      "title": "Репортажная",
      "value": "Reportage"
    },
    {
      "title": "Рекламная",
      "value": "Advertising"
    },
    {
      "title": "Ню",
      "value": "Nu"
    },
    {
      "title": "Life-style",
      "value": "Life-style"
    }
  ]

  const experienceData = [
    {
      "title": "0-1",
      "value": "Beginner"
    },
    {
      "title": "1-3",
      "value": "Beginner-Intermediate"
    },
    {
      "title": "3-5",
      "value": "Intermediate"
    },
    {
      "title": "5-10",
      "value": "Intermediate-Advanced"
    },
    {
      "title": "Более 10",
      "value": "Advanced"
    }
  ]


  const selectedActive = activeData.find((item) => item.value === active)
  const selectedSpecialization = specializationData.find((item) => item.value === specialization)
  const selectedExperience = experienceData.find((item) => item.value === experience)

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
        />
        <Input
          id="e-mail"
          label="E-mail"
          placeholder='mail@mail.ru'
          size='small'
          type='mail'
        />
        <Input
          id="location"
          label="Локация"
          placeholder='Страна, город'
          size='small'
          type='text'
        />
        <Input
          id="date_birth"
          label="Дата рождения"
          placeholder='дд.мм.гггг'
          size='small'
          type='date'
        />
        <DropDown
          options={activeData}
          selected={selectedActive || null}
          onChange={handleActiveSelect}
          placeholder='Выберите деятельность'
          label='Деятельность'
        />
        <DropDown
          options={specializationData}
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
        />
        <div className={styles.sex}>
          <Checkbox title='Муж' id='man' />
          <Checkbox title='Жен' id='woman' />
        </div>
        <DropDown
          options={experienceData}
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
        />
        <Button
          typeButton='empty'
          title='Отмена'
        />
      </div>
    </div>

  );
};

export default CreatingProfileComponent;

