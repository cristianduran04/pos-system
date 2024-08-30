import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import Inventory from './components/Inventory';
import Customers from './components/Customers';
import CashRegister from './components/CashRegister';
import Statistics from './components/Statistics';
import Sales from './components/Sales';
import Suppliers from './components/Suppliers';
import Billing from './components/Billing';
import MoneyOut from './components/MoneyOut';
import AgregarProducto from './components/AgregarProducto';
function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<MainPage />}>
          <Route path="inventory" element={<Inventory />} />
          <Route path="cashregister" element={<CashRegister />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="customers" element={<Customers />} />
          <Route path="sales" element={<Sales />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="billing" element={<Billing />} />
          <Route path="moneyout" element={<MoneyOut />} />
          <Route path="agregarproducto" element={<AgregarProducto />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

