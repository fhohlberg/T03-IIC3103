import React from 'react'

class ExchangeRow extends React.Component {

  render() {
    return (
      <tr >
        <td>{this.props.exchange_name.toUpperCase()}</td>
        <td>
          {this.props.exchange_data.volumen_buy}
        </td>
        <td>
          {this.props.exchange_data.volumen_sell}
        </td>
        <td>
          {this.props.exchange_data.volumen_sell + this.props.exchange_data.volumen_buy}
        </td>
        <td >
          {this.props.exchange_data.listed_companies.length}
        </td>
        <td >
          {this.props.exchange_data.participacion.toFixed(2)}
        </td>
      </tr>
    );
  }
}

export default ExchangeRow;
