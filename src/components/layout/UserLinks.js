import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

function UserLinks(props) {
  const { auth } = props;
  return (
    <Nav>
        <NavLink className="nav-link" to="/tenders">Licitaciones</NavLink>
        { !auth.uid ? <NavLink className="nav-link" to="/signin">Ingresar</NavLink> : null }
    </Nav>
  )
}

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(UserLinks)