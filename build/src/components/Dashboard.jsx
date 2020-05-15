import React from 'react'
import * as bulma from "reactbulma";
import StocksList from "./StocksList.jsx";
import ExchangeList from "./ExchangeList.jsx";
import StocksGraph from "./StocksGraph.jsx";
import StocksLoaderStatus from "./StocksLoaderStatus.jsx";
import socketIOClient from "socket.io-client";

const stocksUrl = 'wss://le-18262636.bitzonte.com';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      all_stocks:{},
      stocks: {},
      exchanges: {},
      market_trend: undefined, // 'up' or 'down'
      connectionError: false,
      isToggleOn: true};

  }

  componentDidMount(){
    this.props.hideSpinner();
    const socket = socketIOClient(stocksUrl, {path: "/stocks"});

    socket.emit("STOCKS", (data) => {});
    socket.on("STOCKS", (data) => {
      this.saveAllStockValues(data);
    });
    //socket.on("STOCKS", (data) => {console.log(data);})

    socket.on("UPDATE", data => this.saveNewStockValues(data));

    socket.on("BUY", data => this.saveNewBuyValues(data));

    socket.on("SELL", data => this.saveNewSellValues(data));

    socket.emit("EXCHANGES", (data) => {});
    socket.on("EXCHANGES", (data) => {
      this.saveNewExchangeValues(data)
    });
  }

  saveNewStockValues = (event) => {
    this.props.hideSpinner();
    let result = event;
    let [up_values_count, down_values_count] = [0, 0];

    // time stored in histories should be consisitent across stocks(better for graphs)
    let new_stocks = this.state.stocks

    if(this.state.stocks[result.ticker])
    {
      new_stocks[result.ticker].current_value > Number(result.value) ? up_values_count++ : down_values_count++;
      new_stocks[result.ticker].change = ((Number(result.value) - new_stocks[result.ticker].current_value) / new_stocks[result.ticker].current_value ) * 100
      new_stocks[result.ticker].current_value = Number(result.value)
      new_stocks[result.ticker].history.push({time: result.time, value: Number(result.value)})

      if(new_stocks[result.ticker].min > Number(result.value) || new_stocks[result.ticker].min == null)
      {
        new_stocks[result.ticker].min = Number(result.value)
      }
      if(new_stocks[result.ticker].max < Number(result.value))
      {
        new_stocks[result.ticker].max = Number(result.value)
      }
    }
    else
    {
      new_stocks[result.ticker] = { current_value: result.value, volumen_buy:0, volumen_sell:0, history: [{time: result.time, value: Number(result.value)}], min: Number(result.value), max: Number(result.value), change: 0,is_selected: false }
    }
    this.setState({stocks: new_stocks, market_trend: this.newMarketTrend(up_values_count, down_values_count)})
  }


  saveNewBuyValues = (event) => {
    this.props.hideSpinner();
    let result = event;

    let new_stocks = this.state.stocks
    let new_exchange = this.state.exchanges
    if(this.state.stocks[result.ticker])
    {
      new_stocks[result.ticker].volumen_buy += result.volume;

      for (var key in this.state.exchanges) {
        if(this.state.exchanges[key].listed_companies.indexOf(this.state.all_stocks[result.ticker].company_name) > -1 ){
          new_exchange[key].volumen_buy += result.volume
        }
      }
    }
    this.setState({stocks: new_stocks, exchanges: new_exchange})
    this.saveNewExchangeVolume();
  }

  saveNewSellValues = (event) => {
    this.props.hideSpinner();
    let result = event;

    let new_stocks = this.state.stocks
    let new_exchange = this.state.exchanges
    if(this.state.stocks[result.ticker])
    {
      new_stocks[result.ticker].volumen_sell += result.volume;

      for (var key in this.state.exchanges) {
        if(this.state.exchanges[key].listed_companies.indexOf(this.state.all_stocks[result.ticker].company_name) > -1 ){
          new_exchange[key].volumen_sell += result.volume
        }
      }
    }
    this.setState({stocks: new_stocks, exchanges: new_exchange})
    this.saveNewExchangeVolume();
  }

  saveNewExchangeVolume = () => {
    let new_exchange = this.state.exchanges
    let volumen_total = 0;

    for (var key in this.state.exchanges) {
      if (new_exchange.hasOwnProperty(key)) {
        volumen_total += new_exchange[key].volumen_sell +  new_exchange[key].volumen_buy;
      }
    }

    for (var key in this.state.exchanges) {
      if (new_exchange.hasOwnProperty(key)) {
        new_exchange[key].participacion = ((new_exchange[key].volumen_sell +  new_exchange[key].volumen_buy)  / volumen_total) * 100;
        //console.log(new_exchange[key].participacion);
      }
    }
    this.setState({exchanges: new_exchange})
  }

  saveNewExchangeValues = (event) => {
    let result = event;
    //console.log(result);

    let new_exchange = this.state.exchanges

    for (var key in result) {
      if (new_exchange.hasOwnProperty(key)) {
        //console.log(new_exchange[key].participacion);
      }
      else
      {
        new_exchange[key] = { name: result[key].name, listed_companies: result[key].listed_companies, volumen_sell: 0, volumen_buy: 0, participacion: 0}
        //console.log(new_exchange[key]);
      }
    }

    this.setState({exchanges: new_exchange})
  }


  saveAllStockValues = (event) => {
    let result = event;

    //console.log(result);
    let new_stocks = this.state.all_stocks
    result.map((stock) =>
    {
      new_stocks[stock.ticker] = {company_name: stock.company_name, quote_base: stock.quote_base}
    });
    this.setState({all_stocks: new_stocks})
  }

  newMarketTrend = (up_count, down_count) => {
    if(up_count === down_count) return undefined;
    return up_count > down_count ? 'up' : 'down'
  }

  toggleStockSelection = (stock_name) => {
    let new_stocks = this.state.stocks;
    new_stocks[stock_name].is_selected = !new_stocks[stock_name].is_selected
    this.setState({ stocks: new_stocks })
  }


  areStocksLoaded = () => {
    return Object.keys(this.state.stocks).length > 0;
  }

  render() {
    return (
      <div className='container'>
      <br></br>
        <div className='rows'>
            <ExchangeList
              exchanges={this.state.exchanges}
            />
            <br></br>
            <StocksList
              stocks={this.state.stocks}
              toggleStockSelection={this.toggleStockSelection}
              resetData={this.resetData}
              market_trend={this.state.market_trend}
              areStocksLoaded={this.areStocksLoaded}
            />
            <br></br>
            <StocksGraph stocks={this.state.stocks} />
          </div>
          <div className={ this.props.showSpinner ? 'modal is-active' : 'modal' }>
            <div className="modal-background"></div>
            <div className="modal-content">
              <StocksLoaderStatus connectionError={this.state.connectionError} />
            </div>
          </div>
        </div>
    );
  }
}

export default Dashboard;
