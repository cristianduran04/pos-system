import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [customerEmail, setCustomerEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cashRegisters, setCashRegisters] = useState([]);
  const [selectedCashRegister, setSelectedCashRegister] = useState('');
  const [customerPayment, setCustomerPayment] = useState('');
  const [change, setChange] = useState(0);

  useEffect(() => {
    // Obtener las cajas disponibles desde una API o base de datos
    const fetchCashRegisters = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cash-registers');
        setCashRegisters(response.data);
      } catch (error) {
        console.error('Error al obtener las cajas:', error);
      }
    };

    fetchCashRegisters();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cart]);

  useEffect(() => {
    if (customerPayment && total) {
      setChange(customerPayment - total);
    }
  }, [customerPayment, total]);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    if (!selectedCashRegister) {
      alert("Por favor selecciona una caja.");
      return;
    }

    if (!paymentMethod) {
      alert("Por favor selecciona un método de pago.");
      return;
    }

    if (customerPayment < total) {
      alert("El dinero entregado por el cliente es insuficiente.");
      return;
    }

    // Aquí se podría implementar la lógica de procesar el pago
    alert(`Compra realizada por un total de $${total}. El cambio es $${change}. El recibo será enviado a ${customerEmail}.`);

    // Limpiar el carrito después de la compra
    setCart([]);
    setTotal(0);
    setCustomerEmail('');
    setPaymentMethod('');
    setSelectedCashRegister('');
    setCustomerPayment('');
    setChange(0);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Typography variant="h4" gutterBottom>Ventas</Typography>
          
          <Table>
            <TableHead>
             
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => addToCart(product)}>
                      Añadir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Typography variant="h6" gutterBottom>Carrito</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre del producto</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>${item.price * item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="h6" gutterBottom>Resumen de la Venta</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Caja</InputLabel>
            <Select
              value={selectedCashRegister}
              onChange={(e) => setSelectedCashRegister(e.target.value)}
            >
              {cashRegisters.map((register) => (
                <MenuItem key={register.id} value={register.id}>{register.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Método de Pago</InputLabel>
            <Select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <MenuItem value="efectivo">Efectivo</MenuItem>
              <MenuItem value="tarjeta">Tarjeta</MenuItem>
              <MenuItem value="transferencia">Transferencia</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="h6">Total: ${total}</Typography>
          <TextField
            label="Dinero entregado por el cliente"
            fullWidth
            margin="normal"
            type="number"
            value={customerPayment}
            onChange={(e) => setCustomerPayment(Number(e.target.value))}
          />
          <Typography variant="h6">Cambio: ${change >= 0 ? change : 0}</Typography>
          <Button variant="contained" color="secondary" fullWidth onClick={handleCheckout}>
            Finalizar Venta
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Sales;
