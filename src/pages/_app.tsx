import type { AppProps } from "next/app";
import { Hydrate, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
//
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
//
import { theme } from "@src/styles/theme";
import { useRef } from "react";
import { queryClient, resumePage } from "../utils";
import { useRouter } from "next/router";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const client = useRef(queryClient);

  queryClient.setQueryData("pageProps", pageProps);
  resumePage(pageProps.pageData?.auth, router);

  // const client = Client.current;

  return (
    <QueryClientProvider client={client.current}>
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
