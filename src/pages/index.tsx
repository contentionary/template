import { createContext } from "react";
import type { GetServerSideProps } from "next";
import themes from "@src/themes";
import { getCentre, handleError } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";
import { request } from "@src/utils";
import { QueryClient } from "react-query";
import { getAuthData } from "../utils/auth";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  },
});

export const TemplateData = createContext<any>(null);

const HomePage = (props: BasePageProps) => {
  queryClient.setQueryData("pageProps", props);
  const { centre } = props.cachedData;
  const ActiveTheme = themes[centre.theme]("Home");
  return <ActiveTheme />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const centre = await getCentre(context);
    const { user, token } = getAuthData(context);
    const { data: templateData } = await request.get({
      url: `/centre/${centre.id}/centre-template`,
      token,
    });

    return {
      props: {
        pageData: {
          templateData,
        },
        cachedData: {
          centre,
          user,
          token,
        },
      },
    };
  } catch (err) {
    return {
      props: {
        error: handleError(err),
      },
    };
  }
};

export default HomePage;
