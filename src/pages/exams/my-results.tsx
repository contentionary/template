import { createContext } from "react";
import { GetServerSideProps } from "next";
import themes from "@src/templates";
import { request } from "@src/utils";
import { getCentre, pageErrorHandler } from "@src/utils";
import {
  BasePageProps,
  ExamListInt,
  CachedCentreInt,
} from "@src/utils/interface";
import { getAuthData } from "@src/utils/auth";
import { queryClient } from "@src/utils";

export const CentreExamsContext = createContext<ExamListInt | null>(null);

const MyExamsPage = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    queryClient.setQueryData("pageProps", pageProps);
    const ActiveTemplate =
      themes[pageProps.cachedData.centre.template]("ErrorPage");

    return <ActiveTemplate />;
  }
  queryClient.setQueryData("pageProps", pageProps);
  const ActiveTemplate =
    themes[pageProps.cachedData.centre.template]("MyResults");

  return <ActiveTemplate />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let centre: any = {};
  const { token, user } = getAuthData(context);
  try {
    centre = (await getCentre(context)) as CachedCentreInt;
    const { data: results } = await request.get({
      url: "/my-exam-results?limit=10000",
      token,
    });
    return {
      props: {
        pageData: { resultList: results },
        cachedData: { user, centre, token },
      },
    };
  } catch (err) {
    return pageErrorHandler(err, user, token, centre);
  }
};
export default MyExamsPage;
