const ACCESS_TOKEN_KEY = 'accessToken';
const ROLE_KEY = 'userRole';

export type UserRole = 'STUDENT' | 'GRADUATE';

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function clearAccessToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getAccessToken());
}

export function getUserRole(): UserRole | null {
  return localStorage.getItem(ROLE_KEY) as UserRole | null;
}

export function setUserRole(role: UserRole): void {
  localStorage.setItem(ROLE_KEY, role);
}

export function clearUserRole(): void {
  localStorage.removeItem(ROLE_KEY);
}
