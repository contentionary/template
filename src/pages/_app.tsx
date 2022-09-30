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
import { BasePageProps } from "@src/utils/interface";
import Page404 from "@src/components/shared/state/400";
import "@src/styles/pdfReader.css";

function App({ Component, pageProps }: AppProps) {
  const client = useRef(queryClient);
  const { cachedData = null } = pageProps as BasePageProps;

  queryClient.setQueryData("pageProps", pageProps);

  return (
    <QueryClientProvider client={client.current}>
      <Hydrate state={pageProps.dehydrateState}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {cachedData?.centre ? (
            <Component {...pageProps} />
          ) : (
            <Page404
              error={{
                statusCode: 404,
                message: "Website resource not found, Kindly contact Admin",
              }}
              showButton={false}
            />
          )}
        </ThemeProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
