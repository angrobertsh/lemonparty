import { connect } from 'react-redux';
import LemonFocus from './lemon_focus';
import * as LEMON_ACTIONS from '../../actions/lemon_actions';

const mapStateToProps = state => ({
  lemon: state.lemons.focus,
});

const mapDispatchToProps = dispatch => ({
  clearFocus: lemon => dispatch(LEMON_ACTIONS.clearFocus())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LemonFocus);
