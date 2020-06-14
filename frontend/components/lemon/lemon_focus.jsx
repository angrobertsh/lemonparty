import React from 'react';

const LemonFocus = ({lemon, clearFocus}) => {
  return (
    <div id="truck-focus-item">
      <button id="truck-focus-back" onClick={ clearFocus }></button>
      <div id="truck-focus-truck">
        <div className="truck">
          <div className="truck-top">
            <div className="truck-name-address">
              <div className="truck-name"> { `${lemon.tree} Tree` } </div>
              <div className="truck-address"> { lemon.location } </div>
            </div>
          </div>
          <div className="truck-food"> { lemon.note } </div>
          <br />
          <div>Love from,</div>
          <div className="truck-food"> {lemon.finder} </div>
        </div>
      </div>
    </div>
  )
}

export default LemonFocus;
