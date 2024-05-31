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
  await fetch('http://localhost:3010/api/updateUser',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({ 'content-type': 'application/json' }),
    }
  )
  console.log(data)
}

export async function sendNewUser(data: TUserSchema) {
  // const requestModel = {email: data.email}

  // const answer = await fetch('http://localhost:3010/api/user', {
  //   method: 'POST',
  //   body: JSON.stringify(requestModel),
  //   headers: new Headers({ 'content-type': 'application/json' })
  // })
  // console.log(answer)
  await fetch('http://localhost:3010/api/createUser',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({ 'content-type': 'application/json' }),
    }
  )
}
