import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createTender } from '../../store/actions/tenderActions'
import { Redirect } from 'react-router-dom'

class CreateTender extends Component {
  state = {
    type: "Licitacion"
  }
  handleChange = (e) => {
    var partialState = {};
    if(e.target.type !== 'file') {
      partialState[e.target.id] = e.target.value;
    } else {
      partialState[e.target.id] = e.target.files[0];
    }
    this.setState(partialState);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createTender(this.state);
    
  }
  componentDidUpdate() {
    if(this.props.createSuccess) {
      this.props.history.push('/tenders');
    }
  }
  render() {
    const { auth, isSaving, errorMessage } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
        <div className="container">
        <br/>
        <h2>Cargar Licitación</h2>
        <br/>
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="time">Fecha</label>
                <input type="date" className="form-control" id="time" onChange={this.handleChange} required/>
            </div>
            <div className="form-group">
                <label htmlFor="type">Tipo</label>
                <select className="form-control" id="type" onChange={this.handleChange} required>
                  <option value="Licitacion">Licitacion</option>
                  <option value="Cotizacion">Cotizacion</option>
                  <option value="Concurso de precios">Concurso de precios</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="number">Número</label>
                <input type="number" className="form-control" id="number" onChange={this.handleChange} required/>
            </div>
            <div className="form-group">
                <label htmlFor="object">Objeto</label>
                <textarea type="text" className="form-control" id="object" onChange={this.handleChange} required/>
            </div>
            <div className="form-group">
                <label htmlFor="expedient">Expediente</label>
                <input type="text" className="form-control" id="expedient" onChange={this.handleChange} required/>
            </div>
            <div className="form-group">
                <label htmlFor="classification">Clasificación</label>
                <select className="form-control" id="classification" onChange={this.handleChange} required>
                  <option value=""></option>
                  <option value="Obra">Obra</option>
                  <option value="Material">Material</option>
                  <option value="Servicio">Servicio</option>
                </select>
            </div>
            <div className="form-group">
              <label htmlFor="physicalFile">Pliego</label>
              <div className="custom-file">
                <input type="file" className="custom-file-input" id="physicalFile" lang="es" onChange={this.handleChange}/>
                <label className="custom-file-label" htmlFor="physicalFile">
                  {this.state.physicalFile ? this.state.physicalFile.name : 'Seleccionar Archivo'}
                </label>
              </div>
            </div>
            <br/>
            <button className="btn btn-outline-secondary" disabled={isSaving} onClick={() => (this.props.history.push('/tenders'))}>Cancelar</button>&nbsp;
            <button className="btn btn-primary" type="submit" disabled={isSaving}>
            { isSaving ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : null }
              Aceptar
            </button>
            <div className="center red-text">
                { errorMessage ? <p>Se produjo un error</p> : null }
            </div>
            <br/><br/><br/><br/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isSaving: state.tender.isSaving,
    auth: state.firebase.auth,
    createSuccess: state.tender.createSuccess,
    errorMessage: state.tender.errorMessage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createTender: (tender) => dispatch(createTender(tender))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTender)