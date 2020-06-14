import { connect } from 'react-redux';
import LemonAddButton from './lemon_add_button';
import * as LEMON_ACTIONS from '../../actions/lemon_actions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  toggleLemonForm: () => dispatch(LEMON_ACTIONS.toggleLemonForm())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LemonAddButton);
