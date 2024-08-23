import React from 'react';
import { Link, Outlet } from 'react-router-dom';


const MainPage = () => {
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
          </ul>
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainPage;

