import { connect } from 'react-redux';
import LemonMap from './lemon_map';
import * as FILTER_ACTIONS from '../../actions/filter_actions';
import * as LEMON_ACTIONS from '../../actions/lemon_actions';

const mapStateToProps = state => ({
  lemons: state.lemons.lemons,
  focus: state.lemons.focus,
  formOpen: state.lemons.formOpen,
  form: state.lemons.form
});

const mapDispatchToProps = dispatch => ({
  updateLemonFilter: (filter, value) => dispatch(FILTER_ACTIONS.updateLemonFilter(filter, value)),
  fetchLemons: (filters) => dispatch(LEMON_ACTIONS.fetchLemons(filters)),
  setFocus: (lemon) => dispatch(LEMON_ACTIONS.setFocus(lemon)),
  updateLemonForm: (lemon) => dispatch(LEMON_ACTIONS.updateLemonForm(lemon))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LemonMap);
