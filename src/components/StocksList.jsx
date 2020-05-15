import React from 'react'
import { Detector } from "react-detect-offline";
import StockRow from './StockRow.jsx'
import MarketTrendArrow from './MarketTrendArrow.jsx'

const StocksList = (props) => {
  return (
    <div className='card column' id='stocks_list'>
      <div className='card-header'>
        <div className='card-header-title'>
          Stocks
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
        { props.areStocksLoaded() ? <p className='is-size-7 has-text-info'>Seleccione una o varios stocks para mostrar.</p> : null }
        <br></br>
        <table className='table is-bordered'>
          <thead>
            <tr>
              <th>Thicker</th>
              <th>Volumen</th>
              <th>Bajo Histórico</th>
              <th>Alto Histórico</th>
              <th>
                Último Valor
                <MarketTrendArrow current_trend={props.market_trend} />
              </th>
              <th>% Variación</th>
              <th>Historial</th>
              <th>Tiempo</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(props.stocks).map((stock_name, index) =>
              {
                let current_stock = props.stocks[stock_name];
                return (
                  <StockRow
                    key={index} stock_name={stock_name}
                    stock_data={current_stock}
                    toggleStockSelection={props.toggleStockSelection}
                  />
                )
              }
            )}
            { props.areStocksLoaded() ? null : <tr><td colSpan='4'>No hay stocks todavía!</td></tr> }
          </tbody>
        </table>
       </div>
    </div>
  );
}

export default StocksList;
