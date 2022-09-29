import type { AppProps } from "next/app";
import { Hydrate, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
//
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
//
import { theme } from "@src/styles/theme";
import { useRef } from "react";
import { queryClient } from "@src/utils";
import Error from "next/error";

function App({ Component, pageProps }: AppProps) {
  const client = useRef(queryClient);

  queryClient.setQueryData("pageProps", pageProps);

  // const client = Client.current;

  return (
    <QueryClientProvider client={client.current}>
      <Hydrate state={pageProps.dehydrateState}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
          {/* {pageProps?.cachedData?.centre ? (
            
          ) : (
            <Error statusCode={404} />
            // <h1 style={{ width: "100%", height: "100%", textAlign: "center" }}>
            //   Centre Not found
            // </h1>
          )} */}
        </ThemeProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
