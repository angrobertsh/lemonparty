import React from 'react';
import merge from 'lodash/merge';

class LoginForm extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      name: null,
      password: null,
    }
  }

  render(){
    if (this.props.currentUser) {
      return (
        <div id="logout" onClick={this.props.logOut}></div>
      )
    } else {
      let hide
      // let editModeCheck = sessionStorage.getItem("robertslemonpartykey") !== 'xe8v6pai7ct'
      let editModeCheck = (!!sessionStorage.getItem("robertslemonpartykey") && (sessionStorage.getItem("robertslemonpartykey") === window.keyMatch || sessionStorage.getItem("robertslemonpartykey") === window.keyMatch2 || sessionStorage.getItem("robertslemonpartykey") === window.keyMatch3 || sessionStorage.getItem("robertslemonpartykey") === window.keyMatch4))

      if (window.showLogin && !this.props.currentUser) {
        hide = ""
      } else if (editModeCheck && !this.props.currentUser) {
        hide = ""
      } else {
        hide = "hide"
      }

      return (
        <div id="user-form" className={hide}>
          <input id="user-name" name="name" onChange={(e) => this.setState({name: e.currentTarget.value})} />
          <input id="user-password" name="password" onChange={(e) => this.setState({password: e.currentTarget.value})} />
          <div id="user-submit" onClick={() => this.props.logIn(this.state)}>Submit</div>
        </div>
      )
    }
  }
}

export default LoginForm;
