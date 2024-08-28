import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Grid } from '@mui/material';
import axios from 'axios';

const Billing = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    // Obtener las facturas desde una API o base de datos
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/invoices');
        setInvoices(response.data);
      } catch (error) {
        console.error('Error al obtener las facturas:', error);
      }
    };

    fetchInvoices();
  }, []);

  const handleSendInvoice = async (invoiceId) => {
    try {
      // Enviar la factura por correo electrónico
      await axios.post(`http://localhost:5000/api/invoices/${invoiceId}/send`);
      alert('Factura enviada exitosamente.');
    } catch (error) {
      console.error('Error al enviar la factura:', error);
      alert('Ocurrió un error al enviar la factura.');
    }
  };

  const handlePrintInvoice = (invoiceId) => {
    // Aquí se integraría la lógica de impresión, ya sea abriendo una nueva ventana con la factura o enviándola a la impresora
    window.print();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Facturación</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.customerName}</TableCell>
                  <TableCell>${invoice.total}</TableCell>
                  <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={() => handleSendInvoice(invoice.id)}
                    >
                      Enviar
                    </Button>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      onClick={() => handlePrintInvoice(invoice.id)}
                      style={{ marginLeft: '10px' }}
                    >
                      Imprimir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Billing;
