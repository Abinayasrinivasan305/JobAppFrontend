// src/utils/jwtUtils.jsx

// Decode JWT token payload
export const decodeToken = (token) => {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("Failed to decode token", err);
    return null;
  }
};

// Check if token expired
export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  const now = Date.now() / 1000; // current time in seconds
  return decoded.exp < now;
};

// Get token from localStorage
export const getToken = () => localStorage.getItem("token");
