import * as CryptoJS from 'crypto-js';

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

export const encodePassword = (password: string): string => {
  const key = 'my_secret_key';
  const iv = CryptoJS.enc.Utf8.parse('my_initialization_vector');
  const encrypted = CryptoJS.TripleDES.encrypt(password, key, { iv: iv });
  return encrypted.toString()
};

export const decodedPassword = (password: string) => {
  const key = 'my_secret_key';
  const iv = CryptoJS.enc.Utf8.parse('my_initialization_vector');
  const decrypted = CryptoJS.TripleDES.decrypt(password, key, { iv: iv });
  return decrypted.toString()
};

export function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItem(key: string): string {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) as string : 'none';
}

