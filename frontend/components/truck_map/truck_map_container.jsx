import { connect } from 'react-redux';
import TruckMap from './truck_map';
import * as FILTER_ACTIONS from '../../actions/filter_actions';
import * as TRUCK_ACTIONS from '../../actions/truck_actions';

const mapStateToProps = state => ({
  trucks: state.trucks.trucks,
  focus: state.trucks.focus
});

const mapDispatchToProps = dispatch => ({
  updateFilter: (filter, value) => dispatch(FILTER_ACTIONS.updateFilter(filter, value)),
  fetchTrucks: (filters) => dispatch(TRUCK_ACTIONS.fetchTrucks(filters)),
  setFocus: (truck) => dispatch(TRUCK_ACTIONS.setFocus(truck))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TruckMap);
