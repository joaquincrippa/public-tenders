import React from 'react';
import {Navbar as Navb, Nav } from 'react-bootstrap';
import AdminLinks from './AdminLinks';
import UserLinks from './UserLinks';

function Navbar() {
  return (
    <Navb bg="primary" expand="lg">
      <Navb.Brand href="#tenders">
        <img src="http://www.montevera.gob.ar/bundles/monteveraweb/img/LOGO.jpg" className="d-inline-block align-top" alt=""/>
      </Navb.Brand>
      <Navb.Text>
        Sistema de Licitaciones
      </Navb.Text>
      <Navb.Toggle aria-controls="basic-navbar-nav" />
      <Navb.Collapse>
        <Nav className="mr-auto"></Nav>
        <AdminLinks/>
        <UserLinks/>
      </Navb.Collapse>
  </Navb>
  )
}

export default Navbar
