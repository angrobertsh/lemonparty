import React from 'react';

const LemonIndexItem = ({lemon, setFocus, editLemon, deleteLemon}) => {
  return (
    <div className="lemon">
      <div className="lemon-top" onClick={() => setFocus(lemon)}>
        <div className="lemon-name"> { `${lemon.tree} Tree` } </div>
        <div className="lemon-address"> { lemon.location } </div>
        <div className="lemon-address"> From: { lemon.finder } </div>
      </div>
      { (sessionStorage.getItem("robertslemonpartykey") === lemon.token) && (<div className="flex">
        <div onClick={() => editLemon(lemon.id)} className="mr-10">Edit</div>
        <div onClick={() => deleteLemon(lemon.id)}>Delete</div>
      </div>)}
    </div>
  )
}

export default LemonIndexItem;
