import api from "./api";

// Register
export const register = (payload) => api.post("api/auth/register", payload);

// Login
export const login = (payload) => api.post("api/auth/login", payload);

// Logout
export const logout = () => localStorage.clear();

// Save auth info
export const saveAuth = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);
  localStorage.setItem("email", data.email);
};

// Get role
export function getRole() {
  const token = localStorage.getItem('token');
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
    const data = JSON.parse(jsonPayload);
    // strip ROLE_ prefix
    return data.role?.replace(/^ROLE_/, '') || null;
  } catch (err) {
    console.error('Failed to parse role from token', err);
    return null;
  }
}


// Get token
export const getToken = () => localStorage.getItem("token");
