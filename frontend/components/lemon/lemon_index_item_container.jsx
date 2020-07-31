import { connect } from 'react-redux';
import LemonIndexItem from './lemon_index_item';
import * as LEMON_ACTIONS from '../../actions/lemon_actions';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  setFocus: lemon => dispatch(LEMON_ACTIONS.setFocus(lemon)),
  deleteLemon: lemonId => dispatch(LEMON_ACTIONS.deleteLemon(lemonId)),
  editLemon: lemonId => dispatch(LEMON_ACTIONS.editLemon(lemonId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LemonIndexItem);
