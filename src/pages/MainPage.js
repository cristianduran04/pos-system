import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar';  // Asegúrate de tener Sidebar


const MainPage = () => {
  return (
    <div className="main-page">
      <Sidebar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainPage;



