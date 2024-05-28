import { useState } from 'react'
import DropDown from '../../components/drop-down/drop-down'
import Input from '../../components/input/input'
import styles from './customerFeed.module.css'
import data from '../../data.json'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { RadioButton } from '../../components/checkbox/checkbox'
import Button from '../../components/button/button'



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

  const [rangeValues, setRangeValues] = useState({ min: 10000, max: 100000 });

  const handleRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setRangeValues({ min: value[0], max: value[1] });
    }
  }

  const [theme, setTheme] = useState({ man: false, woman: false, any: false })

  const onChangeTheme = (e) => {
    const { name } = e.target
    if (name === 'man') {
      setTheme({ man: true, woman: false, any: false })
    }
    if (name === 'woman') {
      setTheme({ man: false, woman: true, any: false })
    }
    if (name === 'any') {
      setTheme({ man: false, woman: false, any: true })
    }
  }


  return (
    <div className={styles.containerSearchOutside}>
      Кого вы ищите?
      <div className={styles.containerSearchInside}>
        <Input
          id='city'
          label='Город'
          placeholder='Начните вводить'
          view='main'
          type='text'

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
        <div className={styles.radioButtonContainer}>
          <p>Пол</p>
          <RadioButton
            name="man"
            id="man"
            value="man"
            text="М"
            onChange={onChangeTheme}
            checked={theme.man}
          />
          <RadioButton
            name="woman"
            id="woman"
            value="woman"
            text="Ж"
            onChange={onChangeTheme}
            checked={theme.woman}
          />
          <RadioButton
            name="any"
            id="any"
            value="any"
            text="Любой"
            onChange={onChangeTheme}
            checked={theme.any}
          />
        </div>
        <div className={styles.sliderContainer}>
          Цена
          <Slider
            min={1000}
            max={100000}
            step={500}
            range
            defaultValue={[rangeValues.min, rangeValues.max]}
            onChange={handleRangeChange}
            trackStyle={{ backgroundColor: "#49C8C8", height: 2 }}
            railStyle={{ backgroundColor: "white", height: 2 }}
            handleStyle={{
              border: "none",
              height: 15,
              width: 15,
              marginTop: -7,
              backgroundColor: "#49C8C8",
            }}
          />
          <div className={styles.priceText}>от {rangeValues.min} до {rangeValues.max} рублей</div>
        </div>
        <DropDown
          options={ageData.content}
          selected={selectedAge || null}
          label='Возраст'
          view='main'
          onChange={handleAgeSelect}
          size='small'
        />
        <Button
          title='Искать'
          typeButton='search'

        />
      </div>
    </div>
  )
}
