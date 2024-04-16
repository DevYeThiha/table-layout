import api from "@/lib/api";
import { Request, Response, ResponseError } from "@/types";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

type IUseQueryOptions<TData> = UseQueryOptions<Response, ResponseError, Response<TData>, any[]>
const client = (url: string, config?: Request) => {
  return api(url, { method: "GET", ...config })
    .then((res) => Promise.resolve(res))
    .catch((err) => {
      switch (err.code) {
        case 401:
          break;
      }

      return Promise.reject(err);
    });
};
export function useFetchQuery<TData = any>(
  url: string,
  $config?: Request & { key?: string },
  options?: Omit<IUseQueryOptions<TData>,"queryKey">
) {
  const { key, ...config } = $config || {};

  return useQuery({ queryKey: key ? [key] : [url, config?.payload], queryFn: () => client(url, config), ...options });
}

export function useFetchQueryWithQuery<TData = any>(
  url: string,
  $config?: Request & { key?: string; defaultQuery?: any },
  options?: Omit<IUseQueryOptions<TData>,"queryKey">
) {
  const router = useRouter();
  const configData = {
    payload: { ...$config?.defaultQuery, ...router.query },
    ...$config,
  };
  const data = useFetchQuery(url, configData, options);
  return data;
}
