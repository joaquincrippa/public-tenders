import React from 'react';
import {Navbar as Navb, Nav } from 'react-bootstrap';
import AdminLinks from './AdminLinks';
import UserLinks from './UserLinks';
import { connect } from 'react-redux';

function Navbar(props) {
  const { auth } = props;

  return (
    <Navb bg="primary" expand="lg" collapseOnSelect>
      <Navb.Brand href="/tenders">
        <img src="http://www.montevera.gob.ar/bundles/monteveraweb/img/LOGO.jpg" className="d-inline-block align-top" alt=""/>
      </Navb.Brand>
      <Navb.Text>
        Sistema de Licitaciones
      </Navb.Text>
      <Navb.Toggle aria-controls="basic-navbar-nav" />
      <Navb.Collapse>
        <Nav className="mr-auto"></Nav>
        <UserLinks/>
        {auth.uid ? <AdminLinks/> : null}
      </Navb.Collapse>
  </Navb>
  )
}

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Navbar)
