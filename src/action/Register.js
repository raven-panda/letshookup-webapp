import axios from 'axios';
import { API_LOGIN, API_REGISTER } from '../utils/ApiUrl.js';
import { LoginMock } from './MockedAction.js';
import { Log } from '../utils/Log.js';

const isFixtureEnable = import.meta.env.VITE_ENABLE_FIXTURES === 'true';

export default async function Register(body) {
  if (isFixtureEnable) return LoginMock();

  try {
    await axios.post(API_REGISTER, body);
    return true;
  } catch (e) {
    Log.apiFails('Error while posting login data :', e.message);
    return false;
  }
}
