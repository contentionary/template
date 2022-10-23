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
    themes[pageProps.cachedData.centre.template]("MyExams");

  return <ActiveTemplate />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let centre: any = {};
  const { pageId = 1 } = context.query;
  const { token, user } = getAuthData(context);
  try {
    centre = (await getCentre(context)) as CachedCentreInt;
    const { data: examList } = await request.get({
      url: `/my-exams?pageId=${pageId}`,
      token,
    });

    return {
      props: { pageData: { examList }, cachedData: { user, centre, token } },
    };
  } catch (err) {
    return pageErrorHandler(err, user, token, centre);
  }
};
export default MyExamsPage;
