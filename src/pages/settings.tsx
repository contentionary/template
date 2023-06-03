import { createContext } from "react";
import { GetServerSideProps } from "next";
import template from "@src/templates";
import { getCentre, pageErrorHandler } from "@src/utils";
import {
  BasePageProps,
  ExamListInt,
  CachedCentreInt,
} from "@src/utils/interface";
import { getAuthData } from "@src/utils/auth";
import { queryClient } from "@src/utils";

export const CentreExamContext = createContext<ExamListInt | null>(null);

const SettingsPage = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    queryClient.setQueryData("pageProps", pageProps);
    const ActiveTemplate =
      template[pageProps.cachedData.centre.template]("ErrorPage");

    return <ActiveTemplate />;
  }
  queryClient.setQueryData("pageProps", pageProps);
  const ActiveTemplate =
    template[pageProps.cachedData.centre.template]("Settings");
  return <ActiveTemplate />;
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
