import React from 'react';
import LemonAddButtonContainer from '../lemon_form/lemon_add_button_container';

const LemonFocus = ({lemon, clearFocus}) => {
  if (lemon) {
    return (
      <div id="lemon-focus">
        <div id="lemon-focus-item">
          <button id="lemon-focus-back" onClick={ clearFocus }>{'<'}</button>
          <div id="lemon-focus-lemon">
            <div className="lemon">
              <div className="lemon-top">
                <div className="lemon-name-address">
                  <div className="lemon-name"> { `${lemon.tree} Tree` } </div>
                  <div className="lemon-address"> { lemon.location } </div>
                </div>
              </div>
              <div className="lemon-food"> { lemon.note } </div>
              <br />
              <div>Love from,</div>
              <div className="lemon-food"> {lemon.finder} </div>
            </div>
          </div>
        </div>
        <LemonAddButtonContainer />
      </div>
    )
  } else {
    return null;
  }
}

export default LemonFocus;
