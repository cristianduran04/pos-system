import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={() => navigate('/sales')}>Sales</Button>
        <Button color="inherit" onClick={() => navigate('/inventory')}>Inventory</Button>
        <Button color="inherit" onClick={() => navigate('/customers')}>Customers</Button>
        <Button color="inherit" onClick={() => navigate('/cashregister')}>Cash Register</Button>
        <Button color="inherit" onClick={() => navigate('/statistics')}>Statistics</Button>
        <Button color="inherit" onClick={() => navigate('/agregarproducto')}>agregarproducto</Button>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
