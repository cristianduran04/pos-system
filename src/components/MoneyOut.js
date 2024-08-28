import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import axios from 'axios';

const CashWithdrawal = () => {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [cashRegisters, setCashRegisters] = useState([]);
  const [selectedCashRegister, setSelectedCashRegister] = useState('');
  const [transactions, setTransactions] = useState([]);

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

  const handleWithdrawal = async () => {
    if (!selectedCashRegister || !amount || !reason) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Aquí enviarías la transacción a la API para guardarla en la base de datos
    try {
      const response = await axios.post('http://localhost:5000/api/withdrawals', {
        amount,
        reason,
        cashRegisterId: selectedCashRegister,
      });

      // Actualizar la lista de transacciones después de la retirada
      setTransactions([...transactions, response.data]);

      // Limpiar los campos del formulario
      setAmount('');
      setReason('');
      setSelectedCashRegister('');
      
      alert('Salida de dinero registrada exitosamente.');

    } catch (error) {
      console.error('Error al registrar la salida de dinero:', error);
      alert('Ocurrió un error al registrar la salida de dinero.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Salida de Dinero</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Monto"
            fullWidth
            margin="normal"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Motivo"
            fullWidth
            margin="normal"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleWithdrawal}
          >
            Registrar Salida de Dinero
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>Transacciones Recientes</Typography>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.amount} - {transaction.reason} (Caja: {transaction.cashRegisterId})
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default CashWithdrawal;
