import React from 'react';

const LemonIndexItem = ({lemon, setFocus}) => {
  return (
    <div className="truck" onClick={() => setFocus(lemon)}>
      <div className="truck-top">
        <div className="truck-name-address">
          <div className="truck-name"> { `${lemon.tree} Tree` } </div>
          <div className="truck-address"> { lemon.location } </div>
        </div>
      </div>
    </div>
  )
}

export default LemonIndexItem;
