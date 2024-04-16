import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'


import type { AppProps } from "next/app";

const queryClient = new QueryClient();
const asyncStoragePersister = createAsyncStoragePersister({
  storage: typeof window !== "undefined" ? localStorage : undefined,
})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
      <ReactQueryDevtools initialIsOpen />
        <Component {...pageProps} />
      </PersistQueryClientProvider>
    </>
  );
}
