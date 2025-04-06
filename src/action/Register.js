import axios from 'axios';
import { API_LOGIN, API_REGISTER } from '../utils/ApiUrl.js';
import { LoginMock } from './MockedAction.js';

const isFixtureEnable = import.meta.env.VITE_ENABLE_FIXTURES === 'true';

export default async function Register(body) {
  if (isFixtureEnable) return LoginMock();

  try {
    await axios.post(API_REGISTER, body);
    return true;
  } catch (e) {
    console.error('Error while posting login data :', e);
    return false;
  }
}
