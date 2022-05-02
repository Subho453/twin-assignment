import { combineReducers } from "redux";

const initialState = {
  outboundCall: null,
  callHistory: null,
};

const callReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MAKE_OUTBOUND_CALL_SUCCESS":
      return {
        ...state,
        outboundCall: action.payload,
      };
    case "GET_CALL_HISTORY_SUCCESS":
      return {
        ...state,
        callHistory: action.payload.map((ele) => ({ ...ele, key: ele.id })),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  call: callReducer,
});

export default rootReducer;
