import React from 'react';
import LemonIndexItemContainer from './lemon_index_item_container';

class LemonIndex extends React.Component{
  constructor(props){
    super(props);
    this.renderLemons = this.renderLemons.bind(this);
  }

  componentDidMount(){
    this.lemonIndexContainer.classList.add("fade-in");
  }

  renderLemons(){
    let lemons = Object.keys(this.props.lemons).reverse();
    return lemons.length === 0 ? <div className="lemon">No lemon trees in this area. </div> : lemons.map((key) => (<LemonIndexItemContainer key={key} lemon={this.props.lemons[key]} />));
  }

  render(){
    let lemons = this.renderLemons();
    return (
      <div id="lemon-index-container" className="to-fade-in-slower" ref={ lemonIndexContainer => this.lemonIndexContainer = lemonIndexContainer }>
        <div id="lemon-index">
          <div id="lemon-index-header-container">
            <header id="lemon-index-header">Nearby Lemon Trees</header>
          </div>
          <ul id="lemon-index-list">
            { lemons }
          </ul>
        </div>
      </div>
    );
  }
}

export default LemonIndex;
