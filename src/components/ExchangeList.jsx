import React from 'react'
import { Detector } from "react-detect-offline";
import ExchangeRow from './ExchangeRow.jsx'

const ExchangeList = (props) => {
  return (
    <div className='card column' id='exchange_list'>
      <div className='card-header'>
        <div className='card-header-title'>
          Exchanges
          &nbsp;
          <Detector
            render={({ online }) => (
              <span className={online ? "tag is-success" : "tag is-danger"}>
                {online ? "Live" : "Offline"}
              </span>
            )}
          />
          &nbsp;
        </div>
      </div>
      <div className='card-content'>
        <table className='table is-bordered'>
          <thead>
            <tr>
              <th>Thicker</th>
              <th>Volumen Compra</th>
              <th>Volumen Venta</th>
              <th>Volumen Total</th>
              <th>Cantidad Acciones</th>
              <th>Participación mercado</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(props.exchanges).map((exchange_name, index) =>
              {
                let current_exchange = props.exchanges[exchange_name];
                return (
                  <ExchangeRow
                    key={index} exchange_name={exchange_name}
                    exchange_data={current_exchange}
                  />
                )
              }
            )}
          </tbody>
        </table>
       </div>
    </div>
  );
}

export default ExchangeList;
