import React from 'react';

class LemonModal extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const hide = this.props.modalOpen ? "" : "hide"

    return <div className={hide} id="lemon-modal-container" onClick={this.props.toggleLemonModal}>
      <div id="lemon-modal">
        <img id="starimg" src="http://res.cloudinary.com/dujcpxlhk/image/upload/v1475615460/uh5yqgf0v5ngtsorktkn.png" />
        <div>
          Robert Luvs Ya!
        </div>
        <div id="closebutton">
          Close
        </div>
      </div>
    </div>
  }
}

export default LemonModal;
