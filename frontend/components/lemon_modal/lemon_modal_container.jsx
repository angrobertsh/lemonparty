import { connect } from 'react-redux';
import LemonModal from './lemon_modal';
import * as LEMON_ACTIONS from '../../actions/lemon_actions';

const mapStateToProps = state => ({
  modalOpen: state.lemons.modalOpen
});

const mapDispatchToProps = dispatch => ({
  toggleLemonModal: () => dispatch(LEMON_ACTIONS.toggleLemonModal(false)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LemonModal);
