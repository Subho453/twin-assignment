const makeOutBoundCall = (data) => ({
  type: "MAKE_OUTBOUND_CALL_REQUEST",
  payload: { data },
});

const getCallHistory = (limit, offset) => ({
  type: "GET_CALL_HISTORY_REQUEST",
  payload: { limit, offset },
});

export { makeOutBoundCall, getCallHistory };
