import { useEffect, useState } from 'react'
import DropDown from '../../components/drop-down/drop-down'
import Input from '../../components/input/input'
import styles from './customerFeed.module.css'
import data from '../../data.json'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { RadioButton } from '../../components/checkbox/checkbox'
import Button from '../../components/button/button'
import { TUserSchema, readlAllUsers } from '../../transport'
import { UserCard, calculateAge } from '../../components/userCard/userCard'

type SearchSchema = {
  location: string,
  specialization: string,
  active: string,
  experience: string,
  sex: string,
  price: {
    min: number,
    max: number
  },
  age: string
}

export const CustomerFeed = (): JSX.Element => {

  const dataSet = data.models
  const [activeData, specializationData, experienceData, ageData] = [...dataSet]

  const [location, setLocation] = useState<string>('')

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

  const selectedSpecialization = specializationData.content.find((item) => item.id === specialization)
  const selectedActive = activeData.content.find((item) => item.id === active)
  const selectedExperience = experienceData.content.find((item) => item.id === experience)
  const selectedAge = ageData.content.find((item) => item.id === age)

  const [rangeValues, setRangeValues] = useState({ min: 10000, max: 100000 });

  const handleRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setRangeValues({ min: value[0], max: value[1] });
    }
  }

  const [theme, setTheme] = useState({ man: false, woman: false, any: false })

  const onChangeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const sex = theme.man ? 'man' : theme.woman ? 'woman' : 'any'


  const [usersList, setUsersList] = useState<TUserSchema[]>([])

  useEffect(() => {
    const dataFromBD = readlAllUsers()
    dataFromBD?.then(result => {
      setUsersList(result)
    }).catch(error => {
      console.log(error)
    });
  }, []);

  const Data: SearchSchema = {
    location: location,
    specialization: specialization,
    active: active,
    experience: experience,
    sex: sex,
    price: rangeValues,
    age: age
  }

  const filterItems = () => {
    const filtered = usersList.filter(item => item.price >= rangeValues.min && item.price <= rangeValues.max)
    setUsersList(filtered);
    if (active !== '') {
      const filtered = usersList.filter(item =>
        item.activity.indexOf(active) !== -1
      );
      setUsersList(filtered);
    }
    if (specialization !== '') {
      const filtered = usersList.filter(item =>
        item.specialization.indexOf(specialization) !== -1)
      setUsersList(filtered);
    }
    if (location !== '') {
      const filtered = usersList.filter(item =>
        item.location === location)
      setUsersList(filtered);
    }
    if (experience !== '') {
      const filtered = usersList.filter(item =>
        item.experience === Data.experience)
      setUsersList(filtered);
    }
    if (sex !== 'any') {
      const filtered = usersList.filter(item =>
        item.sex === sex)
      setUsersList(filtered);
    }
    if (age !== '') {
      const ageArray = age.split('-')
      const ageMin = Number(ageArray[0])
      const ageMax = Number(ageArray[1])
      const filtered = usersList.filter(item =>
        calculateAge(item.dateBirthday) >= ageMin
        && calculateAge(item.dateBirthday) <= ageMax)
      setUsersList(filtered);
    }
    setUsersList(filtered);
  }


  return (
    <>
      <div className={styles.containerSearchOutside}>
        Кого вы ищите?
        <div className={styles.containerSearchInside}>
          <Input
            id='city'
            label='Город'
            placeholder='Начните вводить'
            view='main'
            type='text'
            value={location}
            onCahge={event => setLocation(event.target.value)}

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
            click={() => filterItems()}
          />
        </div>
      </div>
      <div className={styles.users_container}>
        {usersList.map((user, id) => (
          <UserCard user={user} key={id} />
        ))}
      </div>
    </>
  )
}
