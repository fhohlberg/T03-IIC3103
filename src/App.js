import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard.jsx'
import UnsafeScriptsWarning from "./components/UnsafeScriptsWarning";

class App extends Component {

  constructor(){
  super();
  this.handleClick = this.handleClick.bind(this);
  }

  state = {
    hasError: false,
    showSpinner: true
  }

  static getDerivedStateFromError(error) {
    console.log('Ocurrió algún error');
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  hideSpinner = () => {
    this.setState({showSpinner: false});
  }

  handleClick() {
  this.setState(state => ({
    isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    if (this.state.hasError) {
      return <UnsafeScriptsWarning />;
    }
    if(!this.state.isToggleOn){
      return (
        <div className='container' style={{ textAlign: "center" }}>
        <br></br>
          <button onClick={this.handleClick}>
            {this.state.isToggleOn ? 'CONECTAR SOCKET' : 'DESCONECTAR SOCKET'}
          </button>
          <Dashboard hideSpinner={this.hideSpinner} showSpinner={this.state.showSpinner} />
        </div>
    );
    }else{
      return (
          <div className='container' style={{ textAlign: "center" }}>
            <br></br>
            <div className='container'>
              <br></br>
                <button onClick={this.handleClick}>
                  {this.state.isToggleOn ? 'CONECTAR SOCKET' : 'DESCONECTAR SOCKET'}
                </button>
              <br></br>
            </div>
        </div>);
      }
  }
}

export default App;
