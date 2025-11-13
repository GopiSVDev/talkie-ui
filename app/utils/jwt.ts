export function isTokenExpired(expiresAt?: number | null): boolean {
  if (!expiresAt) return true;
  return Date.now() >= expiresAt;
}

export function shouldRefreshToken(expiresAt?: number | null): boolean {
  if (!expiresAt) return true;

  // Refresh 1 hour before expiry
  const refreshThreshold = 60 * 60 * 1000;
  return Date.now() >= expiresAt - refreshThreshold;
}
