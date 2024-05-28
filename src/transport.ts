export type TUserSchema = {
  passwordHash: string,
  photoBase64: string,
  coverBase64: string,
  name: string,
  email: string,
  location: string,
  dateBirthday: string,
  activity: string[],
  specialization: string[],
  price: number,
  sex: string,
  experience: string,
  aboutMe: string,
  picturesBase64: string[]
}

export async function sendUser(data: TUserSchema) {
  await fetch('http://localhost:3010/api/createUser',
    {
      mode: 'no-cors',
      method: 'POST',
      body: JSON.stringify(data),
    }
  )
  console.log(data)
}

