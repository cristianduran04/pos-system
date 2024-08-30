import axios from 'axios';

const API_URL = 'http://localhost:1337/api'; // Cambia esta URL a la de tu API

// Función para agregar un producto
export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/inventarios`, { data: productData });
    return response.data;
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    throw error;
  }
};


