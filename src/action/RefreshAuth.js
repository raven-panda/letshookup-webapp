import axios from 'axios';
import { API_REFRESH_TOKEN } from '../utils/ApiUrl.js';
import { RefreshAuthMock } from './MockedAction.js';
import { Log } from '../utils/Log.js';

const isFixtureEnable = import.meta.env.VITE_ENABLE_FIXTURES === 'true';

export default async function RefreshAuth() {
  if (isFixtureEnable) return RefreshAuthMock();

  try {
    await axios.get(API_REFRESH_TOKEN, {
      withCredentials: true,
    });
    return true;
  } catch (e) {
    Log.apiFails('Error while posting login data :', e.message);
    return false;
  }
}
