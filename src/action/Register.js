import axios from 'axios';
import { API_LOGIN, API_REGISTER } from '../utils/ApiUrl.js';
import { LoginMock } from './MockedAction.js';
import { Log } from '../utils/Log.js';
import { toast } from 'react-toastify';

const isFixtureEnable = import.meta.env.VITE_ENABLE_FIXTURES === 'true';

export default async function Register(body) {
  if (isFixtureEnable) return LoginMock();

  try {
    await axios.post(API_REGISTER, body);
    return true;
  } catch (e) {
    Log.apiFails('Error while posting login data :', e.message);
    if (e.response.data?.errors?.username)
      toast.error("Ce nom d'utilisateur est indisponible");
    else if (e.response.data?.errors?.email)
      toast.error('Ce compte existe déjà.');
    else toast.error('Une erreur est survenue.');
    return false;
  }
}
