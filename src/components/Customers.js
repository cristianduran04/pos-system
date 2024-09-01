import React, { useState, useEffect } from 'react';
import { 
  TextField, Button, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Dialog, DialogActions, DialogContent, DialogTitle 
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { addCustomer, updateCustomer, deleteCustomer } from '../api/operaciones';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState('');
  const [cedula, setCedula] = useState('');
  const [celular, setCelular] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentCustomerId, setCurrentCustomerId] = useState(null);

  // Estado del diálogo
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/clientes'); // Cambia la URL según corresponda
        const data = await response.json();
        setCustomers(data.data);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  const handleAddCustomer = async () => {
    try {
      const newCustomer = { nombre: name, cedula, telefono: celular };
      const response = await addCustomer(newCustomer);
      if (response.data) {
        setCustomers([...customers, response.data]);
        setName('');
        setCedula('');
        setCelular('');
      }
    } catch (error) {
      console.error('Failed to add customer:', error);
    }
  };

  const handleEditCustomer = async () => {
    try {
      const updatedCustomer = { nombre: name, cedula, telefono: celular };
      const response = await updateCustomer(currentCustomerId, updatedCustomer);
      if (response.data) {
        setCustomers(customers.map(customer =>
          customer.id === currentCustomerId ? response.data : customer
        ));
        setOpenDialog(false);
        setName('');
        setCedula('');
        setCelular('');
        setCurrentCustomerId(null);
      }
    } catch (error) {
      console.error('Failed to update customer:', error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await deleteCustomer(id);
      setCustomers(customers.filter(customer => customer.id !== id));
    } catch (error) {
      console.error('Failed to delete customer:', error);
    }
  };

  const handleEditClick = (customer) => {
    setEditMode(true);
    setCurrentCustomerId(customer.id);
    setName(customer.attributes.nombre || '');
    setCedula(customer.attributes.cedula || '');
    setCelular(customer.attributes.telefono || '');
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditMode(false);
    setName('');
    setCedula('');
    setCelular('');
    setCurrentCustomerId(null);
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
        label="Cédula"
        fullWidth
        margin="normal"
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
      />
      <TextField
        label="Celular"
        fullWidth
        margin="normal"
        value={celular}
        onChange={(e) => setCelular(e.target.value)}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleAddCustomer}
      >
        Agregar Cliente
      </Button>

      <Typography variant="h6" gutterBottom>Lista Clientes</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Cédula</TableCell>
            <TableCell>Celular</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.attributes.nombre || 'N/A'}</TableCell>
              <TableCell>{customer.attributes.cedula || 'N/A'}</TableCell>
              <TableCell>{customer.attributes.telefono || 'N/A'}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEditClick(customer)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteCustomer(customer.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Diálogo Modal para Editar Cliente */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Editar Cliente</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Cédula"
            fullWidth
            margin="normal"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
          />
          <TextField
            label="Celular"
            fullWidth
            margin="normal"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEditCustomer} color="primary">
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Customers;





