import React from 'react';

class LemonAddButton extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div id="open-lemon-form-container">
        <div id="open-lemon-form" onClick={this.props.toggleLemonForm}>
          Add a Lemon Tree
        </div>
      </div>
    );
  }
}

export default LemonAddButton;
