import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Grid, FormControl, InputLabel, Select, MenuItem, Autocomplete } from '@mui/material';
import axios from 'axios';

const Sales = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
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
          setAllProducts(response.data.data);
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
        if (Array.isArray(response.data.data)) {
          const cashRegisterNames = response.data.data.map(caja => caja.attributes.nombredecaja);
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

  const handleSearch = () => {
    if (searchTerm) {
      const filtered = allProducts.filter(product =>
        product.attributes.nombredeproducto.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                price: (item.attributes.preciodeventa / 1000) * (item.attributes.tipo === 'peso' ? item.quantity : 1),
              }
            : item
        );
      }
      return [...prevCart, {
        ...product,
        quantity: 1,
        price: product.attributes.preciodeventa,
      }];
    });
    setFilteredProducts((prevFilteredProducts) =>
      prevFilteredProducts.filter((p) => p.id !== product.id)
    );
  };

  const updateQuantity = (id, quantity, isWeightProduct = false) => {
    if (quantity <= 0) return; // Prevent setting quantity to zero or negative
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
              price: isWeightProduct
                ? (item.attributes.preciodeventa / 1000) * quantity // price per gram
                : item.attributes.preciodeventa * quantity, // price per unit
            }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
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
        paymentMethod,
        cashRegisterId: selectedCashRegister,
      });

      await Promise.all(
        cart.map((item) =>
          axios.patch(`http://localhost:1337/api/inventarios/${item.id}`, {
            data: {
              cantidad: item.attributes.cantidad - item.quantity
            }
          })
        )
      );

      alert(`Compra realizada por un total de $${total}. El cambio es $${change}.`);

      setCart([]);
      setTotal(0);
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

          <Autocomplete
            freeSolo
            options={allProducts
              .map(product => product.attributes.nombredeproducto)}
            inputValue={searchTerm}
            onInputChange={(event, newInputValue) => {
              setSearchTerm(newInputValue);
              handleSearch();
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar producto"
                fullWidth
                margin="normal"
              />
            )}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
          >
            Buscar
          </Button>

          {searchTerm && filteredProducts.length > 0 && (
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
                {filteredProducts.map((product) => (
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
          )}

          <Typography variant="h6" gutterBottom>Carrito</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre del producto</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.attributes.nombredeproducto}</TableCell>
                  <TableCell>
                    {item.attributes.tipo === 'peso' ? (
                      <TextField
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value), true)}
                        inputProps={{ min: 0 }}
                        helperText="Ingrese el peso en gramos"
                      />
                    ) : (
                      <TextField
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                        inputProps={{ min: 1 }}
                      />
                    )}
                  </TableCell>
                  <TableCell>${item.attributes.preciodeventa}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="h6" gutterBottom>Resumen de la Venta</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Método de Pago</InputLabel>
            <Select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <MenuItem value="efectivo">Efectivo</MenuItem>
              <MenuItem value="transferencia">Transferencia</MenuItem>
              <MenuItem value="tarjeta">Tarjeta</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Caja</InputLabel>
            <Select
              value={selectedCashRegister}
              onChange={(e) => setSelectedCashRegister(e.target.value)}
            >
              {cashRegisters.map((name, index) => (
                <MenuItem key={index} value={name}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            type="number"
            label="Pago del cliente"
            fullWidth
            margin="normal"
            value={customerPayment}
            onChange={(e) => setCustomerPayment(Number(e.target.value))}
            inputProps={{ min: 0 }}
          />

          <Typography variant="h6" gutterBottom>Total: ${total}</Typography>
          <Typography variant="h6" gutterBottom>Cambio: ${change.toFixed(2)}</Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckout}
            fullWidth
          >
            Finalizar Venta
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Sales;















