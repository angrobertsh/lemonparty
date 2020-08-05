import React from 'react';

class LemonModal extends React.Component{
  render(){
    const hide = this.props.imageModalOpen ? "" : "hide"

    return <div className={hide} id="image-modal-container" onClick={this.props.closeImageModal}>
      <img id="image-modal-image" src={this.props.url} />
    </div>
  }
}

export default LemonModal;
