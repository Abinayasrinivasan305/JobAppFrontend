import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const decodeToken = (token) => {
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
    } catch {
      return null;
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.post('api/auth/login', form);
      const token = res.data.token;
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const role = decodeToken(token)?.role?.replace(/^ROLE_/, '');
      if (role === 'SUPER_ADMIN') navigate('/dashboard/superadmin');
      else if (role === 'ADMIN') navigate('/dashboard/admin');
      else navigate('/dashboard/user');
    } catch (err) {
      console.error('Login failed:', err.response?.data || err);
      setError(err.response?.data?.message || 'Invalid credentials or token expired');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #e0f7fa, #80deea)',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: '90%',
          maxWidth: 400,
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
        }}
      >
        <Typography variant="h5" align="center" mb={3}>
          Login
        </Typography>
        <form onSubmit={submit}>
          <TextField
            label="Email"
            fullWidth
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            sx={{ mb: 2 }}
          />
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
