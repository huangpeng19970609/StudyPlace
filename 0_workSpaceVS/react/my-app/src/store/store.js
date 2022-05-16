// store 由 state、reducer （reducer 负责action）
import { combineReducers, createStore } from "redux";

import listReducer from "./reducer/list.js";
import listState from "./state/list.js";
const allReducer = combineReducers({
  listReducer,
});
const store = createStore(listReducer, {
  ...listState,
});
export default store;
