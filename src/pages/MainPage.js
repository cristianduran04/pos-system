import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { User } from '../api/user';

const MainPage = () => {
  const {user, logout} = useAuth()
  var x = true;
  console.log("el usuario actual es: ", user)
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/login');
  };
  
  console.log("la puta condicion", (user != null))
  if(user != null){
  
  const cerrarsesion = ()=>{
    logout()
    navigate("/login")
  }
  
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
            <li onClick={()=>cerrarsesion()}><a>Cerrar Sesion</a></li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
} else if(user == null) {
  return navigate("/login")
}
};

export default MainPage;

