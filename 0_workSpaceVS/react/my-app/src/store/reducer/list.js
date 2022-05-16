import CONSTANT from "../constant.js";
import listState from "../state/list.js";
export default function Reducer(state = listState, action) {
  switch (action.type) {
    case CONSTANT.CHNAGE_ID:
      console.log(state, action);
      return {
        ...state,
        curId: action.curId,
      };
    default:
      return state;
  }
}
