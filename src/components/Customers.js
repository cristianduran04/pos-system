import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import API from '../services/api';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await API.get('/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  const handleAddCustomer = async () => {
    try {
      const newCustomer = { name, email, phone };
      const response = await API.post('/customers', newCustomer);
      if (response.data.success) {
        setCustomers([...customers, response.data.customer]);
        setName('');
        setEmail('');
        setPhone('');
      }
    } catch (error) {
      console.error('Failed to add customer:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Clientes</Typography>
      <TextField
        label="Nombre"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Celular"
        fullWidth
        margin="normal"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAddCustomer}>
        Agregar Cliente
      </Button>

      <Typography variant="h6" gutterBottom>Lista Clientes</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Celular</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Customers;

