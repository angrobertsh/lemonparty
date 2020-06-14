import React from 'react';

const LemonIndexItem = ({lemon, setFocus, editLemon, deleteLemon}) => {
  return (
    <div className="truck">
      <div className="truck-top" onClick={() => setFocus(lemon)}>
        <div className="truck-name-address">
          <div className="truck-name"> { `${lemon.tree} Tree` } </div>
          <div className="truck-address"> { lemon.location } </div>
        </div>
      </div>
      <div onClick={() => editLemon(lemon.id)}>Edit</div>
      <div onClick={() => deleteLemon(lemon.id)}>Delete</div>
    </div>
  )
}

export default LemonIndexItem;
