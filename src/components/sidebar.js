import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem } from '@mui/material';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h1>POS System</h1>
      <nav>
        <List>
          <ListItem><Link to="/sales">Realizar Venta</Link></ListItem>
          <ListItem><Link to="/inventory">Inventario</Link></ListItem>
          <ListItem><Link to="/cashregister">Caja</Link></ListItem>
          <ListItem><Link to="/statistics">Estadísticas</Link></ListItem>
          <ListItem><Link to="/categorymanager">Categorías</Link></ListItem>
          <ListItem><Link to="/customers">Clientes</Link></ListItem>
          <ListItem><Link to="/suppliers">Proveedores</Link></ListItem>
          <ListItem><Link to="/billing">Facturación</Link></ListItem>
          <ListItem><Link to="/moneyout">Salida de Dinero</Link></ListItem>
        </List>
      </nav>
    </aside>
  );
};

export default Sidebar;
