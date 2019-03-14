import React from 'react';
import { Nav } from 'react-bootstrap';

function UserLinks() {
  return (
    <Nav>
        <Nav.Link href="/tenders">Licitaciones</Nav.Link>
        <Nav.Link href="#link">Ingresar</Nav.Link>
    </Nav>
  )
}

export default UserLinks