import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import API from '../services/api';

const CashRegister = () => {
  const [openingAmount, setOpeningAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleOpenRegister = async () => {
    try {
      const response = await API.post('/cashregister/open', { openingAmount: parseFloat(openingAmount) });
      if (response.data.success) {
        setCurrentAmount(parseFloat(openingAmount));
        setOpeningAmount('');
      }
    } catch (error) {
      console.error('Failed to open register:', error);
    }
  };

  const handleWithdraw = async () => {
    try {
      const response = await API.post('/cashregister/withdraw', { amount: parseFloat(withdrawAmount) });
      if (response.data.success) {
        setCurrentAmount(currentAmount - parseFloat(withdrawAmount));
        setWithdrawAmount('');
      }
    } catch (error) {
      console.error('Failed to withdraw money:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Cash Register</Typography>
      <TextField
        label="Opening Amount"
        fullWidth
        margin="normal"
        value={openingAmount}
        onChange={(e) => setOpeningAmount(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleOpenRegister}>
        Open Register
      </Button>

      <Typography variant="h6" gutterBottom>Current Amount: ${currentAmount}</Typography>
      
      <TextField
        label="Withdraw Amount"
        fullWidth
        margin="normal"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleWithdraw}>
        Withdraw
      </Button>
    </Container>
  );
};

export default CashRegister;
