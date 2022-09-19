import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
//
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
//
import { theme } from "@src/styles/theme";
import { useRef } from "react";
import { handleError } from "../utils";

function App({ Component, pageProps }: AppProps) {
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnReconnect: true,
          refetchOnWindowFocus: false,
          staleTime: 0, //Result should be considered stalled after 30 seconds
          retry: 0, //Failed request should not be retried
          cacheTime: 10 * 60 * 1000, //cached data should be purged after 10 minutes
          onError: handleError,
          refetchOnMount: false,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient.current}>
      <Hydrate state={pageProps.dehydrateState}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
