import React from 'react'

const StocksLoaderStatus = props => {
  if(props.connectionError) {
    return (
      <div className='is-medium'>
        <span className='has-text-danger' >No se han recibido datos. </span>
        <br />(Vuelva después? :-))
      </div>
    );
  } else {
    return (
      <div className='tag is-large is-success'>
        <span className='loader'> &nbsp;</span>
        &nbsp; &nbsp; Cargando stocks..
      </div>
    );
  }
}

export default StocksLoaderStatus;
