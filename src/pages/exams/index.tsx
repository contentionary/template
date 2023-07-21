import { createContext } from "react";
// next js
import { GetServerSideProps } from "next";
// utils interface and styles
import { request } from "@src/utils";
import {
  BasePageProps,
  ExamListInt,
  CachedCentreInt,
} from "@src/utils/interface";
import { getAuthData } from "@src/utils/auth";
import { queryClient, getCentre, pageErrorHandler } from "@src/utils";
// template components
import Exams from "@src/template/views/exams";
import ErrorPage from "@src/template/views/errorPage";

export const CentreExamContext = createContext<ExamListInt | null>(null);

const ExamsPage = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    queryClient.setQueryData("pageProps", pageProps);

    return <ErrorPage />;
  }
  queryClient.setQueryData("pageProps", pageProps);

  return <Exams />;
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
