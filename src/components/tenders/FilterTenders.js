import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTenders } from '../../store/actions/tenderActions';

export class FilterTenders extends Component {

    state = {
        number: '',
        type: '',
        classification: '',
        timeAfter: null,
        timeBefore: null,
        timeAfterInput: '',
        timeBeforeInput: ''
    };

    handleChange = (e) => {
        var partialState = {};
        partialState[e.target.id] = e.target.value;
        if(e.target.id === 'timeAfterInput') {
            if(e.target.value) {
                partialState['timeAfter'] = new Date(Date.parse(e.target.value));
            }
        }
        if(e.target.id === 'timeBeforeInput') {
            if(e.target.value) {
                partialState['timeBefore'] = new Date(Date.parse(e.target.value));
            }
        }
        this.setState(partialState);
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.getTenders(null, this.props.itemsPerPage, this.state);
    }

    resetForm = () => {
        this.setState({
            number: '',
            type: '',
            classification: '',
            timeAfter: null,
            timeBefore: null,
            timeAfterInput: '',
            timeBeforeInput: ''
        });
    }
    

    render() {
        const { isLoading } = this.props;
        return (
            <div className="jumbotron" style={{paddingTop: "2rem", paddingBottom: "1rem"}}>
                <form onSubmit={this.handleSubmit} id="searchForm">
                    <div className="row">
                        <div className="col-md-3">
                            <input type="number" className="form-control" id="number" onChange={this.handleChange} value={this.state.number} placeholder="Número"/>
                            <br/>
                        </div>
                        <div className="col-md-3">
                            <select className="form-control" id="type" onChange={this.handleChange} value={this.state.type}>
                                <option value="">Ningún tipo seleccionado</option>
                                <option value="Licitacion">Licitacion</option>
                                <option value="Cotizacion">Cotizacion</option>
                                <option value="Concurso de precios">Concurso de precios</option>
                            </select>
                            <br/>
                            <select className="form-control" id="classification" onChange={this.handleChange} value={this.state.classification}>
                                <option value="">Obra/Material/Servicio</option>
                                <option value="Obra">Obra</option>
                                <option value="Material">Material</option>
                                <option value="Servicio">Servicio</option>
                            </select>
                            <br/>
                        </div>
                        <div className="col-md-3">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                <div className="input-group-text">Desde</div>
                                </div>
                                <input type="date" className="form-control" id="timeAfterInput" onChange={this.handleChange}/>
                            </div>
                            <br/>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                <div className="input-group-text">Hasta</div>
                                </div>
                                <input type="date" className="form-control" id="timeBeforeInput" onChange={this.handleChange}/>
                            </div>
                            <br/>
                        </div>                            
                        <div className="col-md-2 offset-md-1">
                            <button className="btn btn-primary btn-block" type="submit" disabled={isLoading}>
                                { isLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : null }
                                Buscar
                            </button>
                            <br/>
                            <button className="btn btn-outline-secondary btn-block" disabled={isLoading} onClick={this.resetForm}>Limpiar</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ( {tender} ) => ({
    isLoading: tender.isLoading,
    itemsPerPage: tender.itemsPerPage
  });
  
  const mapDispatchToProps = {
    getTenders
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(FilterTenders);
