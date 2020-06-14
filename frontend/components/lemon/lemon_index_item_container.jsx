import { connect } from 'react-redux';
import LemonIndexItem from './lemon_index_item';
import * as LEMON_ACTIONS from '../../actions/lemon_actions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setFocus: lemon => dispatch(LEMON_ACTIONS.setFocus(lemon))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LemonIndexItem);
