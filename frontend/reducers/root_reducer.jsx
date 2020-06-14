import { combineReducers } from 'redux';
import LemonReducer from './lemon_reducer';
import TruckReducer from './truck_reducer';
import FilterReducer from './filter_reducer';

const RootReducer = combineReducers({
  lemons: LemonReducer,
  trucks: TruckReducer,
  filters: FilterReducer
});

export default RootReducer;
