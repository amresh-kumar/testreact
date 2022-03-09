import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import Home from "./Home";
import Common from "./Common";
import Filter from "./Filter";

const reducers = combineReducers({
  form,
  Home,
  Common,
  Filter
});

const rootReducer = (state, action) => reducers(state, action);

export default rootReducer;
