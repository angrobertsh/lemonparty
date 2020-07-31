import { connect } from 'react-redux';
import LemonForm from './lemon_form';
import * as LEMON_ACTIONS from '../../actions/lemon_actions';

const mapStateToProps = state => ({
  formLemon: state.lemons.form,
  formOpen: state.lemons.formOpen,
  errors: state.lemons.errors,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  updateLemonForm: (lemon) => dispatch(LEMON_ACTIONS.updateLemonForm(lemon)),
  clearLemonForm: () => dispatch(LEMON_ACTIONS.clearLemonForm()),
  toggleLemonForm: () => dispatch(LEMON_ACTIONS.toggleLemonForm()),
  updateLemon: (lemon) => dispatch(LEMON_ACTIONS.updateLemon(lemon)),
  createLemon: (lemon) => dispatch(LEMON_ACTIONS.createLemon(lemon))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LemonForm);
