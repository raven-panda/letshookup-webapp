const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const API_REFRESH_TOKEN = `${apiBaseUrl}/auth/refresh`;
export const API_LOGIN = `${apiBaseUrl}/auth/login`;
export const API_REGISTER = `${apiBaseUrl}/auth/register`;
export const API_LOGOUT = `${apiBaseUrl}/auth/logout`;
