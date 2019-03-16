import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import { getTenders } from '../../store/actions/tenderActions';
import moment from 'moment';

export class ListTenders extends Component {
    
    componentDidMount() {
        this.reset();
        document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }
        
    reset = () => {
        this.getEntities(null);
    };

    trackScrolling = () => {
        const wrappedElement = document.getElementById('end');
        if (wrappedElement.getBoundingClientRect().bottom <= window.innerHeight) {
          this.handleLoadMore();
        }
    };

    handleLoadMore = () => {
        if (window.pageYOffset > 0 && !this.props.lastPage && !this.props.isLoading) {
            const length = this.props.entities.length;
            if (length > 0) {
                this.getEntities(this.props.entities[length-1]);
            }
        }
    };

    getEntities = (lastElement) => {
        this.props.getTenders(lastElement, this.props.itemsPerPage);
    };
    
    render() {
        const tenders = this.props.entities;
        const { isLoading } = this.props;

        return (
        <div>
            <br/>
            <h1>
                Licitaciones
            </h1>
            <br/>
            {tenders.length > 0 ? 
            (<Table striped bordered hover responsive="md">
                <thead>
                    <tr>
                        <th className="text-center">Fecha</th>
                        <th className="d-none d-md-table-cell text-center">Tipo</th>
                        <th className="text-center">Número</th>
                        <th>Objeto</th>
                        <th className="d-none d-md-table-cell text-center">Expediente</th>
                        <th className="d-none d-md-table-cell text-center">Obra/Material/Servicio</th>
                        <th className="d-none d-md-table-cell text-center">Pliego</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tenders && tenders.map( (tender) => 
                            (<tr key={tender.id}style={{cursor: 'pointer'}}>
                                <td className="text-center" onClick={() => this.props.history.push(`/tenders/${tender.id}`)} >{moment(tender.data().time.toDate()).format("DD/MM/YYYY")}</td>
                                <td className="d-none d-md-table-cell text-center" onClick={() => this.props.history.push(`/tenders/${tender.id}`)} >{tender.data().type}</td>
                                <td className="text-center" onClick={() => this.props.history.push(`/tenders/${tender.id}`)} >{tender.data().number}</td>
                                <td onClick={() => this.props.history.push(`/tenders/${tender.id}`)} >{tender.data().object}</td>
                                <td className="d-none d-md-table-cell text-center" onClick={() => this.props.history.push(`/tenders/${tender.id}`)} >{tender.data().expedient}</td>
                                <td className="d-none d-md-table-cell text-center" onClick={() => this.props.history.push(`/tenders/${tender.id}`)} >{tender.data().classification}</td>
                                <td className="d-none d-md-table-cell text-center">
                                    { tender.data().folderUrl ?
                                        <a className="btn" href={tender.data().folderUrl} target="_blank" rel="noopener noreferrer">
                                            <i className="fa fa-file-pdf-o"></i>
                                        </a>
                                    : null }
                                </td>
                            </tr>)
                        )
                    }
                </tbody>
            </Table>
            ): null}
            <div className="text-center" id="end">
                { isLoading ? (
                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>) : (tenders.length === 0 ?
                    <span>No se encontraron licitaciones</span> : null
                )
                }
                
            </div>
        </div>
        )
    }
}

const mapStateToProps = ( {tender} ) => ({
    entities: tender.entities,
    itemsPerPage: tender.itemsPerPage,
    lastPage: tender.lastPage,
    entity: tender.entity,
    errorMessage: tender.errorMessage,
    isLoading: tender.isLoading
  });
  
  const mapDispatchToProps = {
    getTenders
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListTenders);
