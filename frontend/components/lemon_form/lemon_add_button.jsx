import React from 'react';

class LemonAddButton extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    if (!this.props.formOpen) {
      return (
        <div className="open-lemon-form-container">
          <div className="open-lemon-form" onClick={this.props.toggleLemonForm}>
            Add a Lemon Tree
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default LemonAddButton;
