import React, { Component } from 'react';
import { getTender } from '../../store/actions/tenderActions';
import { connect } from 'react-redux';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import moment from 'moment';


export class ViewTender extends Component {
  
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);
    this.props.getTender(id);
  }

  render() {
    const { isLoading, entity } = this.props;
    return (
      <div class="container-fluid">
        { isLoading ?
            <SkeletonTheme color="#E2DEDE" >
                <p>
                    <br/>
                    <Skeleton height={70}/>
                    <br/><br/><br/>
                    <Skeleton count={5} height={50}/>
                </p>
            </SkeletonTheme>
        : null }
       { entity ?
            <div>
                <br/>
                <h2>Información de Licitación</h2>
                <br/>
                <div className="form-group">
                    <h5 htmlFor="time">Fecha</h5>
                    <label id="time">{moment(entity.time.toDate()).format("DD/MM/YYYY")}</label>
                </div>
                <div className="form-group">
                    <h5 htmlFor="number">Número</h5>
                    <label id="number">{entity.number}</label>
                </div>
                <div className="form-group">
                    <h5 htmlFor="type">Tipo</h5>
                    <label id="type">{entity.type}</label>
                </div>
                <div className="form-group">
                    <h5 htmlFor="object">Objeto</h5>
                    <label id="object">{entity.object}</label>
                </div>
                <div className="form-group">
                    <h5 htmlFor="expedient">Expediente</h5>
                    <label id="expedient">{entity.expedient}</label>
                </div>
                <div className="form-group">
                    <h5 htmlFor="classification">Obra/Material/Servicio</h5>
                    <label id="classification">{entity.classification}</label>
                </div>
                <div className="form-group">
                    <h5 htmlFor="folder">Pliego</h5>
                    { entity.folderUrl ? 
                        <a class="btn btn-link" style={{color: "black"}} href={entity.folderUrl} target="_blank" rel="noopener noreferrer">Descargar</a> :
                        <label id="folder">No ha sido cargado</label>
                    }
                </div>
                <button className="btn btn-outline-secondary" onClick={() => (this.props.history.push('/tenders'))}>Volver</button>
                <br/><br/><br/>
            </div>
        : null }
      </div>
    )
  }
}

const mapStateToProps = ( {tender} ) => ({
    entity: tender.entity,
    errorMessage: tender.errorMessage,
    isLoading: tender.isLoading
  });
  
  const mapDispatchToProps = {
    getTender
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ViewTender);