import React from 'react';

const LemonIndexItem = ({lemon, setFocus, editLemon, deleteLemon}) => {
  let editModeCheck = sessionStorage.getItem("robertslemonpartykey") === 'xe8v6pai7ct';

  let icon;
  if (lemon.tree === "Lemon") {
    icon = 'https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,w_25/v1592092413/Lemons/hiclipart.com_2.png'
  } else if (lemon.tree === "Lime") {
    icon = 'https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,h_32/v1592092399/Lemons/hiclipart.com_6.png'
  } else if (lemon.tree === "Orange") {
    icon = 'https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,h_32/v1592092400/Lemons/hiclipart.com_4.png'
  } else if (lemon.tree === "FAKE") {
    icon = 'https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,w_30/v1595193266/Lemons/newwhiteback.png'
  }

  return (
    <div className={`lemon pale-${lemon.tree}`}>
      <div className="lemon-top" onClick={() => setFocus(lemon)}>
        <div className="lemon-icon"> <img src={icon} /> </div>
        <div className="lemon-location"> { lemon.location } </div>
        <div className="lemon-finder"> From: { lemon.finder } </div>
      </div>
      { (sessionStorage.getItem("robertslemonpartykey") === lemon.token || editModeCheck) && (<div className="lemon-actions">
        <div onClick={() => editLemon(lemon.id)} className="mr-10">Edit</div>
        <div onClick={() => deleteLemon(lemon.id)}>Delete</div>
      </div>)}
    </div>
  )
}

export default LemonIndexItem;
