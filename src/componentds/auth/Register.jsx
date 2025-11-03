import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import { register } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'USER' });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate('/login');
    } catch (error) {
      setErr(error.response?.data?.message || error.message);
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
          maxWidth: 500,
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
        }}
      >
        <Typography variant="h5" align="center" mb={3}>
          Register
        </Typography>
        <form onSubmit={submit}>
          <TextField
            label="Name"
            fullWidth
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            sx={{ mb: 2 }}
          />
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
          <TextField
            label="Role (USER, ADMIN, SUPER_ADMIN)"
            fullWidth
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            sx={{ mb: 2 }}
          />
          {err && (
            <Typography color="error" sx={{ mb: 2 }}>
              {err}
            </Typography>
          )}
          <Button type="submit" variant="contained" fullWidth>
            Register
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
