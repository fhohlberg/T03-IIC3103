import React from 'react'
import AllStockRow from './AllStockRow.jsx'
import MarketTrendArrow from './MarketTrendArrow.jsx'

const StocksList = (props) => {
  return (
    <div className='card column' id='stocks_list'>
      <div className='card-header'>
        <div className='card-header-title'>
          Información Stocks
        </div>
      </div>
      <div className='card-content'>
        <br></br>
        <table className='table is-bordered'>
          <thead>
            <tr>
              <th>Nombre Empresa</th>
              <th>Thicker</th>
              <th>País Origen</th>
              <th>Moneda</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(props.all_stocks).map((stock_name, index) =>
              {
                let current_stock = props.all_stocks[stock_name];
                return (
                  <AllStockRow
                    key={index} stock_name={stock_name}
                    stock_data={current_stock}
                    toggleStockSelection={props.toggleStockSelection}
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

export default StocksList;
