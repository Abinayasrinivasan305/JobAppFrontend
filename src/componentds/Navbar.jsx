import React, { useEffect } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { decodeToken, isTokenExpired } from '../utils/jwtUtils';
import { logout } from '../services/authService';
import { toast } from 'react-toastify';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useFavorites } from '../context/FavoritesContext';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userData = decodeToken(token);
  const role = userData?.role?.replace(/^ROLE_/, '');

  const { userFavorites = [] } = useFavorites(); // safe default

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      logout();
      navigate('/login');
    }
  }, [token, navigate]);

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  const handleHomeClick = () => {
    if (!role) {
      toast.info("Please login before viewing the homepage.");
      navigate('/login');
    } else {
      navigate('/');
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(135deg, #e0f7fa, #80deea)', // light blue gradient
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {/* Stylish Job Portal title */}
        <Typography
          variant="h5"
          sx={{
            color: '#000',
            fontWeight: 'bold',
            fontFamily: "'Pacifico', cursive",
          }}
        >
          Job Portal
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
          <Button onClick={handleHomeClick} sx={{ color: '#000' }}>Home</Button>
          <Button component={Link} to="/contact" sx={{ color: '#000' }}>Contact</Button>

          {!role && (
            <>
              <Button component={Link} to="/login" sx={{ color: '#000' }}>Login</Button>
              <Button component={Link} to="/register" sx={{ color: '#000' }}>Register</Button>
            </>
          )}

          {role === 'ADMIN' && (
            <>
              <Button component={Link} to="/dashboard/admin" sx={{ color: '#000' }}>Dashboard</Button>
              <Button component={Link} to="/create" sx={{ color: '#000' }}>Add Job</Button>
            </>
          )}

          {role === 'SUPER_ADMIN' && (
            <>
              <Button component={Link} to="/dashboard/superadmin" sx={{ color: '#000' }}>Dashboard</Button>
              <Button component={Link} to="/create" sx={{ color: '#000' }}>Add Job</Button>
            </>
          )}

          {role === 'USER' && (
            <>
              <Button component={Link} to="/dashboard/user" sx={{ color: '#000' }}>My Dashboard</Button>

              {/* Favorites icon only for users */}
              <IconButton sx={{ color: userFavorites.length > 0 ? 'red' : 'grey' }}>
                <FavoriteIcon />
                {userFavorites.length > 0 && (
                  <Typography sx={{ ml: 0.5, fontSize: '0.9rem' }}>
                    {userFavorites.length}
                  </Typography>
                )}
              </IconButton>
            </>
          )}

          {role && (
            <Button onClick={onLogout} sx={{ color: '#000' }}>Logout</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
