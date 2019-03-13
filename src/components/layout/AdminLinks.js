import React from 'react';
import { Nav } from 'react-bootstrap';

function AdminLinks() {
  return (
    <Nav>
        <Nav.Link href="#create">Nueva licitación</Nav.Link>
        <Nav.Link href="#create">Salir</Nav.Link>
    </Nav>
  )
}

export default AdminLinks