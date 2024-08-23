import React from 'react';
import { Link } from 'react-router-dom';

const Inventory = () => {
  // Ejemplo de datos de productos, en un caso real, esto vendría de una API o base de datos
  const products = [
   
  ];
      return (
    <div>
      <h1>Inventario</h1>
      {products.length === 0 ? (
        <p>No hay productos en el inventario.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Medida</th>
              <th>Detalles</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.name}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.unit}</td>
                <td>{product.details}</td>
                <td>{product.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link to="/AgregarProducto">
        <button>Agregar Nuevo Producto</button>
      </Link>
    </div>
  );

  
};

export default Inventory;
