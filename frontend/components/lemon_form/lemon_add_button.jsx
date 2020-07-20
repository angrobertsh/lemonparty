import React from 'react';

class LemonAddButton extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      sheen: true,
    }
  }

  componentDidMount() {
    this.timeoutId = setTimeout(function () {
      this.setState({sheen: false});
    }.bind(this), 10000);
  }

  componentWillUnmount () {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  render(){
    const hide = !this.props.formOpen ? "" : "hide"
    const sheen = this.state.sheen ? "sheen" : ""

    return (
      <div className={`open-lemon-form-container ${hide}`}>
        <div className={`open-lemon-form ${sheen}`} onClick={this.props.toggleLemonForm}>
          Add a Lemon Tree
        </div>
      </div>
    );
  }
}

export default LemonAddButton;
