import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import API from '../services/api';

const Statistics = () => {
  const [dailySales, setDailySales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [inventoryValue, setInventoryValue] = useState(0);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const salesResponse = await API.get('/sales/daily');
        setDailySales(salesResponse.data);

        const totalResponse = await API.get('/sales/total');
        setTotalSales(totalResponse.data.total);

        const inventoryResponse = await API.get('/inventory/value');
        setInventoryValue(inventoryResponse.data.value);
      } catch (error) {
        console.error('Failed to fetch statistics:', error);
      }
    };
    fetchStatistics();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Sales Statistics</Typography>
      <Typography variant="h6">Daily Sales</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Total Sales</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dailySales.map((sale) => (
            <TableRow key={sale.date}>
              <TableCell>{sale.date}</TableCell>
              <TableCell>${sale.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography variant="h6" gutterBottom>Total Sales: ${totalSales}</Typography>
      <Typography variant="h6" gutterBottom>Inventory Value: ${inventoryValue}</Typography>
    </Container>
  );
};

export default Statistics;
