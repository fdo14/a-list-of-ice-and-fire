import { combineReducers } from "redux";

import gotReducer from "./gotReducer";

export default combineReducers({
  got: gotReducer
});
