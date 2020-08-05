import { connect } from 'react-redux';
import ImageModal from './image_modal';
import * as LEMON_ACTIONS from '../../actions/lemon_actions';

const mapStateToProps = state => ({
  url: state.lemons.modalUrl,
  imageModalOpen: state.lemons.imageModalOpen
});

const mapDispatchToProps = dispatch => ({
  closeImageModal: () => dispatch(LEMON_ACTIONS.closeImageModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageModal);
