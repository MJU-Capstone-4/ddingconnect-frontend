const AUTH_KEY = 'isAuthenticated';

export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function setAuthenticated(): void {
  localStorage.setItem(AUTH_KEY, 'true');
}

export function clearAuthenticated(): void {
  localStorage.removeItem(AUTH_KEY);
}
