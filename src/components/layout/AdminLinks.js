import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

function AdminLinks(props) {
  return (
    <Nav>
        <NavLink className="nav-link" to="/create">Nueva licitación</NavLink>
        <Nav.Link href="#" onClick={props.signOut}>Salir</Nav.Link>
    </Nav>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => {dispatch(signOut()); return;}
  }
}

export default connect(null, mapDispatchToProps)(AdminLinks)