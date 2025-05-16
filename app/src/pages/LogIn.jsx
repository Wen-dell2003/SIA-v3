import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, InputAdornment,
  IconButton, Paper
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const LogIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.login(formData);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f0f4f8',
        backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        overflow: 'hidden'
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 5,
          width: '100%',
          maxWidth: 420,
          borderRadius: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" align="center" fontWeight="bold" color="primary" mb={2}>
            UnangPahina
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" mb={3}>
            Please sign in to continue
          </Typography>

          {error && (
            <Typography color="error" align="center" mb={2}>
              {error}
            </Typography>
          )}

          <TextField
            label="Email Address"
            name="email"
            type="email"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            required
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ mb: 1 }}
          />

          <Typography variant="body2" align="right" color="primary" sx={{ mb: 3, cursor: 'pointer' }}>
        
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mb: 2, py: 1.5, textTransform: 'none', fontSize: '1rem' }}
          >
            Sign In
          </Button>

          <Typography align="center">
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#1976d2', fontWeight: 500, textDecoration: 'none' }}>
              Sign Up
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default LogIn;
