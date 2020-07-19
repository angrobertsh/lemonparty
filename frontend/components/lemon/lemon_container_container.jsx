import { connect } from 'react-redux';
import LemonContainer from './lemon_container';

const mapStateToProps = state => ({
  formOpen: state.lemons.formOpen,
  focus: state.lemons.focus,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LemonContainer);
