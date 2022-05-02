import { takeLatest, call, put } from "redux-saga/effects";
import { notification } from "antd";
import { fetchCallHistory, makeOutboundCall } from "../api";

function* handleMakeCallRequest(action) {
  try {
    const response = yield call(makeOutboundCall, action.payload.data); // API CALL
    yield put({
      type: "MAKE_OUTBOUND_CALL_SUCCESS",
      payload: response,
    });
    yield notification.success({
      message: `Dialed a call successfully to ${action.payload.data.to}`,
    });
  } catch (error) {
    yield put({
      type: "MAKE_OUTBOUND_CALL_ERROR",
    });
    yield notification.error({
      message: "Something went wrong! Please try again.",
    });
  }
}

function* handleFetchAccountDetailsRequest(action) {
  try {
    const response = yield call(
      fetchCallHistory,
      action.payload.limit,
      action.payload.offset
    ); // API CALL
    yield put({
      type: "GET_CALL_HISTORY_SUCCESS",
      payload: response,
    });
  } catch (error) {
    yield put({
      type: "GET_CALL_HISTORY_ERROR",
    });
    yield notification.error({
      message: "Something went wrong! Please try again.",
    });
  }
}

export default function* rootSaga() {
  yield takeLatest("MAKE_OUTBOUND_CALL_REQUEST", handleMakeCallRequest);
  yield takeLatest(
    "GET_CALL_HISTORY_REQUEST",
    handleFetchAccountDetailsRequest
  );
}
