import axios from "axios";

const request = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_PROD_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 90000,
});

export const makeOutboundCall = async (data) => {
  const result = await request.post(`/api/make-outbound-call`, data);
  return result.data;
};

export const fetchCallHistory = async (limit, offset) => {
  const result = await request.get(
    `/api/call-history?limit=${limit}&offset=${offset}`
  );
  return result.data;
};
