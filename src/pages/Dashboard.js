import React from 'react';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet /> {/* Aquí se renderizarán las rutas anidadas */}
    </div>
  );
};

export default Dashboard;

