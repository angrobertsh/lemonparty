import { combineReducers } from 'redux';
import LemonReducer from './lemon_reducer';
import TruckReducer from './truck_reducer';
import FilterReducer from './filter_reducer';
import SessionReducer from './session_reducer';

const RootReducer = combineReducers({
  lemons: LemonReducer,
  trucks: TruckReducer,
  filters: FilterReducer,
  session: SessionReducer,
});

export default RootReducer;
