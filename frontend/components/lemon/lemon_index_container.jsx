import { connect } from 'react-redux';
import LemonIndex from './lemon_index';
import * as LEMON_ACTIONS from '../../actions/lemon_actions';

const mapStateToProps = state => ({
  lemons: state.lemons.lemons,
  focus: state.lemons.focus,
});

const mapDispatchToProps = dispatch => ({
  clearFocus: () => dispatch(LEMON_ACTIONS.clearFocus())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LemonIndex);
