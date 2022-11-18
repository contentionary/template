import { createContext } from "react";
import { GetServerSideProps } from "next";
import template from "@src/templates";
import { request } from "@src/utils";
import { getCentre, pageErrorHandler } from "@src/utils";
import {
  BasePageProps,
  ExamListInt,
  CachedCentreInt,
} from "@src/utils/interface";
import { getAuthData } from "@src/utils/auth";
import { queryClient } from "@src/utils";

export const CentreExamContext = createContext<ExamListInt | null>(null);

const ExamsPage = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    queryClient.setQueryData("pageProps", pageProps);
    const ActiveTemplate =
      template[pageProps.cachedData.centre.template]("ErrorPage");

    return <ActiveTemplate />;
  }
  queryClient.setQueryData("pageProps", pageProps);
  const ActiveTemplate =
    template[pageProps.cachedData.centre.template]("Exams");
  return <ActiveTemplate />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let centre: any = {};
  const { pageId = 1, folderId = "" } = context.query;
  const { token, user } = getAuthData(context);
  try {
    centre = (await getCentre(context)) as CachedCentreInt;

    const { data: examList } = await request.get({
      url: `/centre/${centre.id}/exams?pageId=${pageId}${
        folderId && `&folderId=${folderId}`
      }`,
      token,
    });

    return {
      props: { pageData: { examList }, cachedData: { user, centre, token } },
    };
  } catch (err) {
    return pageErrorHandler(err, user, token, centre);
  }
};
export default ExamsPage;
