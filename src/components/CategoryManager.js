import React, { useState, useEffect } from 'react';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from '../api/operaciones';
import Modal from 'react-modal';

// Asegúrate de que Modal esté configurado en el elemento raíz de tu aplicación
Modal.setAppElement('#root');

const CategoryManager = ({ onCategoriesUpdate }) => {
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    // Cargar categorías al iniciar el componente
    const loadCategories = async () => {
      try {
        const response = await fetchCategories();
        if (response && response.data) {
          const categoriesData = response.data.map(cat => ({
            id: cat.id,
            name: cat.attributes.nombrecategoria
          }));
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    loadCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (newCategory) {
      try {
        const addedCategory = await addCategory(newCategory);
        const updatedCategories = [
          ...categories,
          {
            id: addedCategory.id,
            name: addedCategory.nombrecategoria
          }
        ];
        setCategories(updatedCategories);
        onCategoriesUpdate(updatedCategories);
        setNewCategory('');
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  };

  const openEditModal = (category) => {
    setEditCategory(category);
    setEditCategoryName(category.name);
    setModalIsOpen(true);
  };

  const closeEditModal = () => {
    setModalIsOpen(false);
    setEditCategory(null);
    setEditCategoryName('');
  };

  const handleSaveEdit = async () => {
    if (editCategoryName) {
      try {
        const updatedCategory = await updateCategory(editCategory.id, editCategoryName);
        const updatedCategories = categories.map(cat =>
          cat.id === updatedCategory.id ? updatedCategory : cat
        );
        setCategories(updatedCategories);
        onCategoriesUpdate(updatedCategories);
        closeEditModal(); // Cerrar el modal después de la actualización
      } catch (error) {
        console.error('Error updating category:', error);
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      const updatedCategories = categories.filter(cat => cat.id !== id);
      setCategories(updatedCategories);
      onCategoriesUpdate(updatedCategories);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
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
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeEditModal}
        contentLabel="Editar Categoría"
        ariaHideApp={false}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            maxWidth: '500px',
            width: '100%',
          },
        }}
      >
        <h3>Editar Categoría</h3>
        <input
          type="text"
          value={editCategoryName}
          onChange={(e) => setEditCategoryName(e.target.value)}
          placeholder="Nombre de la categoría"
        />
        <button onClick={handleSaveEdit}>Guardar</button>
        <button onClick={closeEditModal}>Cancelar</button>
      </Modal>

      <div style={{ marginTop: '20px' }}>
        <h3>Categorías Registradas</h3>
        <ul>
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.id}>
                {category.name}
                <button onClick={() => openEditModal(category)}>Editar</button>
                <button onClick={() => handleDeleteCategory(category.id)}>Eliminar</button>
              </li>
            ))
          ) : (
            <p>No hay categorías registradas.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CategoryManager;










