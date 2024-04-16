import qs from "qs";
import axios from "axios";
import { Request, Response, ResponseError } from "@/types";

export default async function api<T = any>(
  url: string,
  config?: Request
): Promise<Response<T>> {

  const { payload, method, ...rest } = config || {};

  rest.headers = rest.headers || {};
  rest.baseURL = "http://localhost:3000/api";


  rest.headers["Content-Type"] = "application/json";

  return await axios({
    url,
    method,
    ...rest,
    [method !== "GET" ? "data" : "params"]:
      payload,
  })
    .then((res) => {
      if (url.includes("connect/token")) {
        return Promise.resolve({ data: res.data, message: "", res });
      } else {
        const { message, succeeded, errorCode } = res.data;
        return succeeded !== false
          ? Promise.resolve({ data: res.data, message, res })
          : Promise.reject({ code: errorCode, message });
      }
    })
    .catch((err) => {
      console.log("here is err catch:", err?.response?.data?.errorCode);
      if (err?.response?.data?.errorCode === 401) {
        // logout()
      }
      const data = err.response?.data;
      return Promise.reject({
        code: data?.errorCode || err.response?.status,
        message: data?.message || data?.error_description,
      });
    });
}
