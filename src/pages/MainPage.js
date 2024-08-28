import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography } from '@mui/material';
import { User } from '../api/user';

const MainPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (user == null) {
    return navigate('/login');
  }

  const cerrarsesion = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="main-page">
      <aside className="sidebar">
        <h1>POS System</h1>
        <nav>
          <ul>
            <li><Link to="/sales">Ventas</Link></li>
            <li><Link to="/inventory">Inventario</Link></li>
            <li><Link to="/cashregister">Caja</Link></li>
            <li><Link to="/statistics">Estadísticas</Link></li>
            <li><Link to="/customers">Clientes</Link></li>
            <li><Link to="/suppliers">Proveedores</Link></li>
            <li><Link to="/billing">Facturación</Link></li>
            <li><Link to="/moneyout">Salida de Dinero</Link></li>
            <li onClick={cerrarsesion}><a>Cerrar Sesión</a></li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/sales">
              <Paper elevation={3} className="section-card">
                <Typography variant="h6">Ventas</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/inventory">
              <Paper elevation={3} className="section-card">
                <Typography variant="h6">Inventario</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/cashregister">
              <Paper elevation={3} className="section-card">
                <Typography variant="h6">Caja</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/statistics">
              <Paper elevation={3} className="section-card">
                <Typography variant="h6">Estadísticas</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/customers">
              <Paper elevation={3} className="section-card">
                <Typography variant="h6">Clientes</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/suppliers">
              <Paper elevation={3} className="section-card">
                <Typography variant="h6">Proveedores</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/billing">
              <Paper elevation={3} className="section-card">
                <Typography variant="h6">Facturación</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/moneyout">
              <Paper elevation={3} className="section-card">
                <Typography variant="h6">Salida de Dinero</Typography>
              </Paper>
            </Link>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default MainPage;

