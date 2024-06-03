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

export async function sendUser(data: TUserSchema) {
  await fetch('http://localhost:3010/api/updateUser',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({ 'content-type': 'application/json' }),
    }
  )
  
}

export async function sendNewUser(data: TUserSchema) {
  await fetch('http://localhost:3010/api/createUser',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({ 'content-type': 'application/json' }),
    }
  )
}

export async function readUser(emailLocal: string) {
  const requestModel = {email: emailLocal}

  const answer = await fetch('http://localhost:3010/api/user', {
    method: 'POST',
    body: JSON.stringify(requestModel),
    headers: new Headers({ 'content-type': 'application/json' })
  })
  return answer.json()
}


export async function deleetUser(emailLocal: string) {
  const requestModel = {email: emailLocal}

  await fetch('http://localhost:3010/api/deleteUser', {
    method: 'POST',
    body: JSON.stringify(requestModel),
    headers: new Headers({ 'content-type': 'application/json' })
  })
}


export async function readlAllUsers() {
  const users = await fetch('http://localhost:3010/api/userAll', {
    method: 'POST'
  })

  return users.json()
}
