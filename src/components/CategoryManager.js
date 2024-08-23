import React, { useState } from 'react';

const CategoryManager = ({ onCategoriesUpdate }) => {
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory && !categories.includes(newCategory)) {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      onCategoriesUpdate(updatedCategories); // Notifica al componente de Inventario
      setNewCategory('');
    }
  };

  const handleDeleteCategory = (category) => {
    const updatedCategories = categories.filter(cat => cat !== category);
    setCategories(updatedCategories);
    onCategoriesUpdate(updatedCategories); // Notifica al componente de Inventario
  };

  return (
    <div>
      <h2>Gestionar Categorías</h2>
      <form onSubmit={handleAddCategory}>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nueva categoría"
        />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            {category}
            <button onClick={() => handleDeleteCategory(category)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
