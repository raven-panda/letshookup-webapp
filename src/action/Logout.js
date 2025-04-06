import axios from 'axios';
import { API_LOGOUT } from '../utils/ApiUrl.js';
import { LogoutMock } from './MockedAction.js';
import { Log } from '../utils/Log.js';

const isFixtureEnable = import.meta.env.VITE_ENABLE_FIXTURES === 'true';

export default async function Logout() {
  if (isFixtureEnable) return LogoutMock();

  try {
    const response = await axios.get(API_LOGOUT, {
      withCredentials: true,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (e) {
    Log.apiFails('Error while posting login data :', e.message);
    return {
      success: false,
    };
  }
}
