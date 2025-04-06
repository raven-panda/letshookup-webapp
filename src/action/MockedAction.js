export function LoginMock() {
  localStorage.setItem('access_token_mock', 'access_token_mock');
  localStorage.setItem('refresh_token_mock', 'refresh_token_mock');

  return true;
}

export function LogoutMock() {
  localStorage.removeItem('access_token_mock');
  localStorage.removeItem('refresh_token_mock');

  return true;
}

export function RefreshAuthMock() {
  return (
    !!localStorage.getItem('access_token_mock') &&
    !!localStorage.getItem('refresh_token_mock')
  );
}
