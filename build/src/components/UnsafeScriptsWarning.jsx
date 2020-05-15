import React from 'react'

const UnsafeScriptsWarning = props => {
  return (
    <div className='container stocks-loader'>
      <div className='card-header'>
        <div className='card-header-icon'>
          <span className='loader'></span>
        </div>
        <div className='card-header-title'>
          Loading...
        </div>
      </div>
      <div className='card'>
        <div className='card-content'>
          Debes hacer click en &nbsp;<code>"Load Unsafe Scripts"</code>&nbsp; para proceder.
        </div>
      </div>
    </div>
  );
}

export default UnsafeScriptsWarning;
