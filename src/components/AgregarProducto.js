import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { addProduct } from '../api/operaciones'; // Asegúrate de importar la función que creaste

const AddProductForm = () => {
  const [name, setName] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [barcode, setBarcode] = useState('');
  const [measure, setMeasure] = useState(''); // Nuevo estado para medida
  const [details, setDetails] = useState(''); // Nuevo estado para detalles

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const productData = {
      nombredeproducto: name,
      preciodecompra: Number(purchasePrice),
      preciodeventa: Number(salePrice),
      cantidad: Number(quantity),
      categoria: category,
      codigodebarras: barcode,
      medida: measure, // Incluye medida
      detalles: details, // Incluye detalles
    };

    try {
      await addProduct(productData);
      alert('Producto agregado con éxito');
      // Reset form after submission
      setName('');
      setPurchasePrice('');
      setSalePrice('');
      setQuantity('');
      setCategory('');
      setBarcode('');
      setMeasure('');
      setDetails('');
    } catch (error) {
      alert('Error al agregar el producto');
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre del Producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Precio de Compra"
          type="number"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Precio de Venta"
          type="number"
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Cantidad"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Código de Barras"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Medida"
          value={measure}
          onChange={(e) => setMeasure(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Detalles"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Agregar Producto
        </Button>
      </form>
    </Container>
  );
};

export default AddProductForm;



