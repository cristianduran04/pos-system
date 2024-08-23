import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://api.example.com/login', { username, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>Inicio Sesión</Typography>
      <TextField
        label="Usuario"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Contraseña"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Iniciar
      </Button>
    </Container>
  );
};

export default Login;
