import LemonMapContainer from '../lemon_map/lemon_map_container';
import LemonIndexContainer from './lemon_index_container';
import LemonFormContainer from '../lemon_form/lemon_form_container';
import LemonFocusContainer from './lemon_focus_container';
import LemonAddButtonContainer from '../lemon_form/lemon_add_button_container';
import React from 'react';

class LemonContainer extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div id="app-body">
        <LemonMapContainer />
        <div id="lemon-data-area">
          <div id="lemon-show-area">
            <LemonIndexContainer />
            <LemonAddButtonContainer />
          </div>
          <LemonFocusContainer />
          <LemonFormContainer />
        </div>
      </div>
    );
  }
}

export default LemonContainer;
