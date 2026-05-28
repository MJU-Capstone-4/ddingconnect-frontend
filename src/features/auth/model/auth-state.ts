const AUTH_KEY = 'isAuthenticated';
const ROLE_KEY = 'userRole';

export type UserRole = 'STUDENT' | 'GRADUATE';

export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function setAuthenticated(): void {
  localStorage.setItem(AUTH_KEY, 'true');
}

export function clearAuthenticated(): void {
  localStorage.removeItem(AUTH_KEY);
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
