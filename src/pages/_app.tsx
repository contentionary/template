// React component
import { useEffect, useState } from "react";
// next components
import Router from "next/router";
// mui component
import LinearProgress from "@mui/material/LinearProgress";
//
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
import Custom404 from "./404";
import "@src/styles/pdfReader.css";

function App({ Component, pageProps }: AppProps) {
  const [pageLoading, setPageLoading] = useState(false);
  const client = useRef(queryClient);
  const { cachedData = null } = pageProps as BasePageProps;

  queryClient.setQueryData("pageProps", pageProps);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setPageLoading(true);
    });
    Router.events.on("routeChangeComplete", () => {
      setPageLoading(false);
    });
    Router.events.on("routeChangeError", () => {
      setPageLoading(false);
    });
  }, []);

  return (
    <QueryClientProvider client={client.current}>
      <Hydrate state={pageProps.dehydrateState}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {pageLoading && <LinearProgress sx={{ zIndex: 2000 }} />}
          {cachedData?.centre ? <Component {...pageProps} /> : <Custom404 />}
        </ThemeProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
