import { useState } from 'react'
import DropDown from '../../components/drop-down/drop-down'
import Input from '../../components/input/input'
import styles from './customerFeed.module.css'
import data from '../../data.json'

export const CustomerFeed = (): JSX.Element => {

  const dataSet = data.models
  const [activeData, specializationData, experienceData, ageData] = [...dataSet]

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

  const [age, setAgeValue] = useState('');
  const handleAgeSelect = (value: string) => {
    setAgeValue(value)
  }


  const selectedSpecialization = specializationData.content.find((item) => item.value === specialization)
  const selectedActive = activeData.content.find((item) => item.value === active)
  const selectedExperience = experienceData.content.find((item) => item.value === experience)
  const selectedAge = ageData.content.find((item) => item.value === age)


  return (
    <div className={styles.containerSearchOutside}>
      Кого вы ищите?
      <div className={styles.containerSearchInside}>
        <Input
          id='city'
          label='Город'
          placeholder='Начните вводить'
          view='main'
          type='small'
        />
        <DropDown
          options={specializationData.content}
          selected={selectedSpecialization || null}
          label='Специализация'
          view='main'
          onChange={handleSpecializationSelect}
          size='small'
        />
        <DropDown
          options={activeData.content}
          selected={selectedActive || null}
          label='Тип съёмки'
          view='main'
          onChange={handleActiveSelect}
          size='small'
        />
        <DropDown
          options={experienceData.content}
          selected={selectedExperience || null}
          label='Опыт работы'
          view='main'
          onChange={handleExperienceSelect}
          size='small'
        />
        <DropDown
          options={ageData.content}
          selected={selectedAge || null}
          label='Возраст'
          view='main'
          onChange={handleAgeSelect}
          size='small'
        />
      </div>
    </div>
  )
}
