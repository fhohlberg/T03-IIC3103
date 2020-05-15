import React from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines';
import TimeAgo from 'react-timeago'

class StockRow extends React.Component {
  render() {
    return (
      <tr>
        <td>
          {this.props.stock_data.company_name}
        </td>
        <td>{this.props.stock_name.toUpperCase()}</td>
        <td>{this.props.stock_data.country}</td>
        <td>
          {this.props.stock_data.quote_base}
        </td>
      </tr>
    );
  }
}

export default StockRow;
