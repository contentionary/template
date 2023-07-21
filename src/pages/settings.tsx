import { createContext } from "react";
import { GetServerSideProps } from "next";
import { getCentre, pageErrorHandler } from "@src/utils";
import {
  BasePageProps,
  ExamListInt,
  CachedCentreInt,
} from "@src/utils/interface";
import { getAuthData } from "@src/utils/auth";
import { queryClient } from "@src/utils";
// template components
import Settings from "@src/template/views/settings";
import ErrorPage from "@src/template/views/errorPage";

export const CentreExamContext = createContext<ExamListInt | null>(null);

const SettingsPage = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    queryClient.setQueryData("pageProps", pageProps);

    return <ErrorPage />;
  }
  queryClient.setQueryData("pageProps", pageProps);

  return <Settings />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let centre: any = {};
  const { token, user } = getAuthData(context);

  try {
    centre = (await getCentre(context)) as CachedCentreInt;
    // const data = await request.get({
    //   url: "/auth/verify-token",
    //   token,
    // });
    return {
      props: {
        cachedData: { user, centre, token },
      },
    };
  } catch (err) {
    return pageErrorHandler(err, user, token, centre);
  }
};
export default SettingsPage;
