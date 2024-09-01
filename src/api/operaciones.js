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

// Función para agregar una nueva caja
export const addCashRegister = async (cashRegisterData) => {
  try {
    const response = await axios.post(`${API_URL}/cajas`, { data: cashRegisterData });
    return response.data;
  } catch (error) {
    console.error('Error al agregar la caja:', error);
    throw error;
  }
};
// Función para obtener todas las cajas
export const fetchCashRegisters = async () => {
  try {
    const response = await axios.get(`${API_URL}/cajas`);
    return response.data.data.map(cashRegister => ({
      id: cashRegister.id,
      name: cashRegister.attributes.nombrecaja
    }));
  } catch (error) {
    console.error('Error al obtener cajas:', error);
    throw error;
  }
};


// Función para retirar dinero de una caja
export const withdrawFromCashRegister = async (withdrawalData) => {
  try {
    const response = await axios.post(`${API_URL}/cajas/withdraw`, { data: withdrawalData });
    return response.data;
  } catch (error) {
    console.error('Error al retirar dinero de la caja:', error);
    throw error;
  }
};

// Función para agregar un cliente
export const addCustomer = async (customerData) => {
  try {
    const response = await axios.post(`${API_URL}/clientes`, { data: customerData });
    return response.data;
  } catch (error) {
    console.error('Error al agregar el cliente:', error);
    throw error;
  }
};

// Función para actualizar un cliente
export const updateCustomer = async (id, customerData) => {
  try {
    const response = await axios.put(`${API_URL}/clientes/${id}`, { data: customerData });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    throw error;
  }
};

// Función para eliminar un cliente
export const deleteCustomer = async (id) => {
  try {
    await axios.delete(`${API_URL}/clientes/${id}`);
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    throw error;
  }
};

// Función para obtener todas las categorías
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categorias`);
    return response.data.data.map(category => ({
      id: category.id,
      name: category.attributes.nombrecategoria
    }));
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    throw error;
  }
};

// Función para agregar una nueva categoría
export const addCategory = async (category) => {
  try {
    const response = await axios.post(`${API_URL}/categorias`, {
      data: { nombrecategoria: category }
    });
    return {
      id: response.data.data.id,
      name: response.data.data.attributes.nombrecategoria
    };
  } catch (error) {
    console.error('Error al agregar categoría:', error);
    throw error;
  }
};

// Función para actualizar una categoría existente
export const updateCategory = async (id, categoryName) => {
  try {
    const response = await axios.put(`${API_URL}/categorias/${id}`, {
      data: { nombrecategoria: categoryName }
    });
    return {
      id: response.data.data.id,
      name: response.data.data.attributes.nombrecategoria
    };
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    throw error;
  }
};

// Función para eliminar una categoría
export const deleteCategory = async (id) => {
  try {
    await axios.delete(`${API_URL}/categorias/${id}`);
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    throw error;
  }
};



