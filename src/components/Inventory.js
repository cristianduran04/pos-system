import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/inventarios');
        console.log(response.data); // Verifica la estructura de los datos
        setProducts(response.data.data); // Ajusta según la estructura de tu respuesta
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

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
              <th>Precio Compra</th>
              <th>Precio Venta</th>
              <th>Cantidad</th>
              <th>Medida</th>
              <th>Detalles</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.attributes.nombredeproducto}</td>
                <td>{product.attributes.preciodecompra}</td>
                <td>{product.attributes.preciodeventa}</td>
                <td>{product.attributes.cantidad}</td>
                <td>{product.attributes.medida}</td>
                <td>{product.attributes.detalles}</td>
                <td>{product.attributes.categoria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link to="/agregarProducto">
        <button>Agregar Nuevo Producto</button>
      </Link>
    </div>
  );
};

export default Inventory;


