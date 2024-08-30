import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [customerEmail, setCustomerEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cashRegisters, setCashRegisters] = useState([]);
  const [selectedCashRegister, setSelectedCashRegister] = useState('');
  const [customerPayment, setCustomerPayment] = useState('');
  const [change, setChange] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/inventarios');
        if (Array.isArray(response.data.data)) {
          setProducts(response.data.data);
          setFilteredProducts(response.data.data);
        } else {
          console.error('Los datos de productos no son un array:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    const fetchCashRegisters = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/cajas');
        
        if (Array.isArray(response.data)) {
          
          const cashRegisterNames = response.data.map(caja => caja.nombre);
          
          setCashRegisters(cashRegisterNames);
        } else {
          console.error('Los datos de cajas no son un array:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener las cajas:', error);
      }
    };
    

    fetchProducts();
    fetchCashRegisters();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => 
      product.attributes.nombredeproducto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, price: item.unitPrice * (item.quantity + 1) }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1, price: product.attributes.preciodeventa }];
    });
  };

  const updateWeight = (id, weight) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, weight, price: item.unitPrice * weight } : item
      )
    );
  };

  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + item.price, 0);
    setTotal(newTotal);
  }, [cart]);

  useEffect(() => {
    if (customerPayment && total) {
      setChange(customerPayment - total);
    }
  }, [customerPayment, total]);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    if (!selectedCashRegister) {
      alert('Por favor selecciona una caja.');
      return;
    }

    if (!paymentMethod) {
      alert('Por favor selecciona un método de pago.');
      return;
    }

    if (customerPayment < total) {
      alert('El dinero entregado por el cliente es insuficiente.');
      return;
    }

    try {
      
      await axios.post('http://localhost:1337/api/ventas', {
        products: cart,
        total,
        customerEmail,
        paymentMethod,
        cashRegisterId: selectedCashRegister,
      });

      
      await Promise.all(
        cart.map((item) =>
          axios.patch(`http://localhost:1337/api/inventarios/${item.id}`, {
            quantity: item.attributes.cantidad - item.quantity, 
          })
        )
      );

      alert(`Compra realizada por un total de $${total}. El cambio es $${change}. El recibo será enviado a ${customerEmail}.`);

      setCart([]);
      setTotal(0);
      setCustomerEmail('');
      setPaymentMethod('');
      setSelectedCashRegister('');
      setCustomerPayment('');
      setChange(0);
    } catch (error) {
      console.error('Error al procesar la venta:', error);
      alert('Error al procesar la venta');
    }
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Typography variant="h4" gutterBottom>Ventas</Typography>
          
          <TextField
            label="Buscar producto"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre del producto</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(filteredProducts) && filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.attributes.nombredeproducto}</TableCell>
                  <TableCell>${product.attributes.preciodeventa}</TableCell>
                  <TableCell>{product.attributes.cantidad}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => addToCart(product)}
                    >
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
                  <TableCell>{item.attributes.nombredeproducto}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    {item.isWeighted ? (
                      <TextField
                        label="Peso"
                        type="number"
                        value={item.weight || ''}
                        onChange={(e) => updateWeight(item.id, e.target.value)}
                      />
                    ) : (
                      `$${item.unitPrice}`
                    )}
                  </TableCell>
                  <TableCell>${item.price}</TableCell>
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
                <MenuItem key={register.id} value={register.id}>
                  {register.name}
                </MenuItem>
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
            onChange={(e) => setCustomerPayment(parseFloat(e.target.value))}
          />
          <Typography variant="h6">Cambio: ${change}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckout}
          >
            Realizar Venta
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Sales;







