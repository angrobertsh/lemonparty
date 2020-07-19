import React from 'react';

class LemonModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      animate1: false,
      animate2: false
    }
  }

  componentDidUpdate() {
    if (!this.state.animate1 && this.props.modalOpen) {
      this.timeoutId = setTimeout(function () {
        this.setState({animate1: true});
      }.bind(this), 100);

      this.timeoutId2 = setTimeout(function () {
        this.setState({animate2: true});
      }.bind(this), 400);
    } else if (!this.props.modalOpen && this.state.animate1) {
      this.setState({animate1: false, animate2: false})
    }
  }

  componentWillUnmount () {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (this.timeoutId2) {
      clearTimeout(this.timeoutId2);
    }
  }

  render(){
    const hide = this.props.modalOpen ? "" : "hide"
    // const hide = ""
    const isActive1 = this.state.animate1 ? "is-active" : ""
    const isActive2 = this.state.animate2 ? "is-active" : ""
    const src = "https://res.cloudinary.com/dujcpxlhk/image/upload/v1595160381/Lemons/IMG_3145.jpg"
    // const src = "https://res.cloudinary.com/dujcpxlhk/image/upload/v1595161235/Lemons/59924_10100129436684653_5357116_n.jpg"

    const style = {
      backgroundImage: `url(${src})`
    }

    return <div className={hide} id="lemon-modal-container" onClick={this.props.toggleLemonModal}>
      <div id="lemon-modal">
        <div id="lemon-modal-images">
          <div className={`heart ${isActive1}`} />
          <div id="modalimage" style={style} />
          <div className={`heart ${isActive2}`} />
        </div>
        <div id="robertluvsya">
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
