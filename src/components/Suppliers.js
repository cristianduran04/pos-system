import React, { useState } from 'react';

const Suppliers = () => {
  const [supplier, setSupplier] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    contactPerson: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({
      ...supplier,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos a la base de datos o API
    console.log('Proveedor registrado:', supplier);
  };

  return (
    <div>
      <h2>Registrar Proveedor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre (Empresa):</label>
          <input
            type="text"
            name="name"
            value={supplier.name}
            onChange={handleChange}
            placeholder="Nombre de la empresa"
            required
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="text"
            name="phone"
            value={supplier.phone}
            onChange={handleChange}
            placeholder="Número de teléfono"
            required
          />
        </div>
        <div>
          <label>Dirección:</label>
          <input
            type="text"
            name="address"
            value={supplier.address}
            onChange={handleChange}
            placeholder="Dirección"
          />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={supplier.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
          />
        </div>
        <div>
          <label>Persona de Contacto:</label>
          <input
            type="text"
            name="contactPerson"
            value={supplier.contactPerson}
            onChange={handleChange}
            placeholder="Nombre de la persona de contacto"
          />
        </div>
        <div>
          <label>Notas:</label>
          <textarea
            name="notes"
            value={supplier.notes}
            onChange={handleChange}
            placeholder="Notas adicionales"
          />
        </div>
        <button type="submit">Registrar Proveedor</button>
      </form>
    </div>
  );
};

export default Suppliers;

