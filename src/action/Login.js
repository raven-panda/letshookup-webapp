import axios from 'axios';
import { API_LOGIN } from '../utils/ApiUrl.js';
import { LoginMock } from './MockedAction.js';

const isFixtureEnable = import.meta.env.VITE_ENABLE_FIXTURES === 'true';

export default async function Login(body) {
  if (isFixtureEnable) return LoginMock();

  try {
    await axios.post(API_LOGIN, body, {
      withCredentials: true,
    });
    return true;
  } catch (e) {
    console.error('Error while posting login data :', e);
    return false;
  }
}
