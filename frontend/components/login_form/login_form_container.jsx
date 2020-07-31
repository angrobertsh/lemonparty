import { connect } from 'react-redux';
import LoginForm from './login_form';
import * as SESSION_ACTIONS from '../../actions/session_actions';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  logIn: (user) => dispatch(SESSION_ACTIONS.logIn(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
