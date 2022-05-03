import CONSTANT from "../constant.js";
function changeId(id) {
  return {
    type: CONSTANT.CHNAGE_ID,
    curId: id,
  };
}
export { changeId };
