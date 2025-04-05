import axios from 'axios';
import { API_LOGIN } from '../utils/ApiUrl.js';

export default async function Login(body) {
  try {
    const response = await axios.post(API_LOGIN, body);
    return response.data;
  } catch (e) {
    console.error('Error while posting login data :', e);
    return {
      success: false,
    };
  }
}
