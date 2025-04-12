export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!sessionStorage.getItem('token');
}

export function getUserData(): any {
  if (typeof window === 'undefined') return null;
  const userData = sessionStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
}

export function logout(): void {
  if (typeof window === 'undefined') return;
  
  // Clear all session storage data
  sessionStorage.clear();
  
  // Clear any other stored data
  localStorage.clear();
} 