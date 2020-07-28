import React from 'react';

const adjective = {
  0: "Magnificent",
  1: "Stupendous",
  2: "Glorious",
  3: "Raggedy-ass",
  4: "Lovely",
  5: "Literate",
  6: "Plumpcious",
  7: "Wrathful",
  8: "Yummo",
  9: "Dangerous",
}

const LemonFocus = ({lemon, clearFocus}) => {
  if (lemon) {
    const description = adjective[lemon.id.toString()[lemon.id.toString().length-1]]

    let icon;

    if (lemon.tree === "Lemon") {
      icon = 'https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,w_25/v1592092413/Lemons/hiclipart.com_2.png'
    } else if (lemon.tree === "Lime") {
      icon = 'https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,h_32/v1592092399/Lemons/hiclipart.com_6.png'
    } else if (lemon.tree === "Orange") {
      icon = 'https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,h_32/v1592092400/Lemons/hiclipart.com_4.png'
    } else if (lemon.tree === "FAKE") {
      icon = 'https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,w_30/v1595193266/Lemons/newwhiteback.png'
    } else if (lemon.tree === "REAL") {
      icon = 'https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,h_41/v1595824487/Lemons/Screen_Shot_2020-07-26_at_9.29.31_PM.png'
    }

    return (
      <div id="lemon-focus">
        <div id="lemon-focus-item">
          <div id="lemon-focus-topbar">
            <div id="lemon-focus-back" onClick={ clearFocus }>Back</div>
            <div id="lemon-focus-header" className={lemon.tree}>
              {`A ${description} ${lemon.tree} Tree`}
            </div>
          </div>
          <div id="lemon-focus-lemon">
            <div id="lemon-focus-inner">
              <div id="lemon-focus-text">
                <div className="fancy" id="lemon-focus-dearest"> Dearest Robert, </div>
                <br />
                <div className="fancy">I found you a {description} {lemon.tree} tree. I would describe it as follows:</div>
                <br />
                { lemon.location }
                <br />
                <br />
                <div className="fancy">Also,</div>
                <br />
                { lemon.note }
                <br />
                <br />
                <div className="fancy" id="lemon-focus-bye">
                  <div id="lemon-focus-bye-inner">
                    <div>Love from,</div>
                    <div id="lemon-finder-focus"> {lemon.finder} </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return null;
  }
}

export default LemonFocus;
