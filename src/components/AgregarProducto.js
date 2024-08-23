import React, { useState, useEffect } from 'react';
import axios from 'axios';

const units = ['libra', 'kilo', 'litro', 'unidad', 'pieza'];

const AgregarProducto = () => {
  const [item, setItem] = useState({
    name: '',
    price: '',
    unit: '',
    details: '',
    category: ''
  });

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryUpdate = async () => {
    if (newCategory && !categories.includes(newCategory)) {
      try {
        await axios.post('http://localhost:5000/api/categories', { category: newCategory });
        setCategories([...categories, newCategory]);
        setNewCategory('');
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  };

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', item);
      alert('Producto agregado con éxito.');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error al agregar el producto.');
    }
  };

  return (
    <div>
      <h1>Agregar Nuevo Producto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            placeholder="Nombre del producto"
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={item.price}
            onChange={handleChange}
            placeholder="Precio"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label>Medida:</label>
          <select
            name="unit"
            value={item.unit}
            onChange={handleChange}
          >
            <option value="">Seleccionar medida</option>
            {units.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Detalles:</label>
          <textarea
            name="details"
            value={item.details}
            onChange={handleChange}
            placeholder="Detalles del producto"
          />
        </div>
        <div>
          <label>Categoría:</label>
          <select
            name="category"
            value={item.category}
            onChange={handleChange}
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Agregar nueva categoría:</label>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Nueva categoría"
          />
          <button type="button" onClick={handleCategoryUpdate}>
            Agregar Categoría
          </button>
        </div>
        <button type="submit">Guardar Producto</button>
      </form>
    </div>
  );
};

export default AgregarProducto;
