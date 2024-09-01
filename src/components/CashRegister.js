import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const CashRegister = () => {
  const [registerName, setRegisterName] = useState('');
  const [openingAmount, setOpeningAmount] = useState('');
  const [cashRegisters, setCashRegisters] = useState([]);
  const [totalSales, setTotalSales] = useState({});

  // Función para abrir una caja
  const handleOpenRegister = async () => {
    try {
      const response = await axios.post('http://localhost:1337/api/cajas', {
        data: {
          nombre: registerName,
          cantidadinicial: parseFloat(openingAmount),
          cantidadfinaldia: parseFloat(openingAmount),
          entradacajaaldia: 0,
          salidas: 0,
          descripcion: ''
        }
      });

      if (response.status === 200) {
        setCashRegisters([...cashRegisters, response.data.data]);
        setTotalSales((prev) => ({
          ...prev,
          [response.data.data.id]: 0, // Inicializa el total de ventas para esta caja
        }));
        setRegisterName('');
        setOpeningAmount('');
      }
    } catch (error) {
      console.error('Failed to open register:', error);
    }
  };

  // Función para registrar una venta
  const handleRegisterSale = async (registerId, saleAmount) => {
    try {
      // Supongamos que el endpoint para registrar una venta es /api/ventas
      const response = await axios.post('http://localhost:1337/api/ventas', {
        data: {
          cajaId: registerId,
          monto: parseFloat(saleAmount),
          // Agrega otros detalles de la venta si es necesario
        }
      });

      if (response.status === 200) {
        // Actualiza el total de ventas para la caja
        setTotalSales((prev) => ({
          ...prev,
          [registerId]: prev[registerId] + parseFloat(saleAmount)
        }));
      }
    } catch (error) {
      console.error('Failed to register sale:', error);
    }
  };

  // Función para cerrar una caja
  const handleCloseRegister = async (registerId) => {
    const closingAmount = (totalSales[registerId] || 0) + cashRegisters.find((register) => register.id === registerId).attributes.cantidadinicial;

    try {
      const response = await axios.patch(`http://localhost:1337/api/cajas/${registerId}`, {
        data: {
          cantidadfinaldia: closingAmount
        }
      });

      if (response.status === 200) {
        // Actualiza la caja en la lista
        setCashRegisters(cashRegisters.map((register) =>
          register.id === registerId ? { ...register, attributes: { ...register.attributes, cantidadfinaldia: closingAmount } } : register
        ));
        setTotalSales((prev) => {
          const newSales = { ...prev };
          delete newSales[registerId]; // Limpia el total de ventas para esta caja
          return newSales;
        });
      }
    } catch (error) {
      console.error('Failed to close register:', error);
    }
  };

  // Función para obtener cajas existentes
  const fetchCashRegisters = async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/cajas');
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        setCashRegisters(response.data.data);
        // Inicializa el estado totalSales para cada caja
        const sales = {};
        response.data.data.forEach((register) => {
          sales[register.id] = 0;
        });
        setTotalSales(sales);
      } else {
        console.error('La respuesta de la API no contiene un array de cajas:', response.data);
        setCashRegisters([]);
      }
    } catch (error) {
      console.error('Error al obtener las cajas:', error);
      setCashRegisters([]);
    }
  };

  useEffect(() => {
    fetchCashRegisters();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Registro De Caja</Typography>

      {/* Formulario para abrir una caja */}
      <TextField
        label="Nombre de Caja"
        fullWidth
        margin="normal"
        value={registerName}
        onChange={(e) => setRegisterName(e.target.value)}
      />

      <TextField
        label="Monto Inicial"
        fullWidth
        margin="normal"
        value={openingAmount}
        onChange={(e) => setOpeningAmount(e.target.value)}
        type="number"
      />

      <Button variant="contained" color="primary" onClick={handleOpenRegister}>
        Abrir Caja
      </Button>

      {/* Tabla de cajas existentes */}
      <Typography variant="h5" gutterBottom>Listado de Cajas</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Monto Inicial</TableCell>
              <TableCell>Monto Final</TableCell>
              <TableCell>Total Ventas del Día</TableCell>
              <TableCell>Cerrar Caja</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cashRegisters.map((cashRegister) => (
              <TableRow key={cashRegister.id}>
                <TableCell>{cashRegister.attributes.nombre}</TableCell>
                <TableCell>${cashRegister.attributes.cantidadinicial}</TableCell>
                <TableCell>${cashRegister.attributes.cantidadfinaldia}</TableCell>
                <TableCell>${totalSales[cashRegister.id] || 0}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleCloseRegister(cashRegister.id)}
                  >
                    Cerrar Caja
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CashRegister;




