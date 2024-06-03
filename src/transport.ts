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

export function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItem<T>(key: string): T | {email: string} {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) as T : {email: 'none'};
}

const URL = 'http://84.201.130.181:3010'

export async function sendUser(data: TUserSchema) {
  await fetch(`${URL}/api/updateUser`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({ 'content-type': 'application/json' }),
    }
  )
  
}

export async function sendNewUser(data: TUserSchema) {
  await fetch(`${URL}/api/createUser`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({ 'content-type': 'application/json' }),
    }
  )
}

export async function readUser(emailLocal: string) {
  const requestModel = {email: emailLocal}

  const answer = await fetch(`${URL}/api/user`, {
    method: 'POST',
    body: JSON.stringify(requestModel),
    headers: new Headers({ 'content-type': 'application/json' })
  })
  return answer.json()
}


export async function deleetUser(emailLocal: string) {
  const requestModel = {email: emailLocal}

  await fetch(`${URL}/api/deleteUser`, {
    method: 'POST',
    body: JSON.stringify(requestModel),
    headers: new Headers({ 'content-type': 'application/json' })
  })
}


export async function readlAllUsers() {
  const users = await fetch(`${URL}/api/userAll`, {
    method: 'POST'
  })

  return users.json()
}
