import React, { useState, useEffect } from 'react';
import axios from 'axios';

const units = ['libra', 'kilo', 'litro', 'unidad', 'pieza'];

const AgregarProducto = () => {
  const [item, setItem] = useState({
    name: '',
    purchasePrice: '', // Precio de compra
    salePrice: '', // Precio de venta
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
        const response = await axios.post('http://localhost:5000/api/categories', { category: newCategory });
        setCategories((prevCategories) => [...prevCategories, response.data.category]);
        setNewCategory('');
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', item);
      alert('Producto agregado con éxito.');
      setItem({
        name: '',
        purchasePrice: '',
        salePrice: '',
        unit: '',
        details: '',
        category: ''
      });
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
            required
          />
        </div>
        <div>
          <label>Precio de Compra:</label>
          <input
            type="number"
            name="purchasePrice"
            value={item.purchasePrice}
            onChange={handleChange}
            placeholder="Precio de compra"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label>Precio de Venta:</label>
          <input
            type="number"
            name="salePrice"
            value={item.salePrice}
            onChange={handleChange}
            placeholder="Precio de venta"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label>Medida:</label>
          <select
            name="unit"
            value={item.unit}
            onChange={handleChange}
            required
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
            required
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

