import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';
import './SignIn.scss';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state)
  }
  render() {
    const { authError, auth, isLogging } = this.props;
    if (auth.uid) return <Redirect to='/tenders' /> 
    return (
        <form className="form-signin text-center" onSubmit={this.handleSubmit}>
            <br/>
            <h1 className="h3 mb-3 font-weight-normal">Inicio de sesión</h1>
            <br/>
            <label htmlFor="email" className="sr-only">Email</label>
            <input type="email" id='email' onChange={this.handleChange} className="form-control" placeholder="Email" required={true} autoFocus=""/>
            <br/>
            <label htmlFor="password" className="sr-only">Password</label>
            <input type="password" id='password' onChange={this.handleChange}  className="form-control" placeholder="Contraseña" required={true}/>
            <br/>
            <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={isLogging}>
              { isLogging ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : null }
              Ingresar
            </button>
            <br/>
            <div className="center red-text">
                { authError ? <p>{authError}</p> : null }
            </div>
        </form>
    
    )
  }
}

const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth,
    isLogging: state.auth.isLogging
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)