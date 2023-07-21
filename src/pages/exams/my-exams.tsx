import { createContext } from "react";
// next js
import { GetServerSideProps } from "next";
// utils interface and styles
import { request } from "@src/utils";
import { getCentre, pageErrorHandler } from "@src/utils";
import {
  BasePageProps,
  ExamListInt,
  CachedCentreInt,
} from "@src/utils/interface";
import { queryClient } from "@src/utils";
import { getAuthData } from "@src/utils/auth";
// template components
import MyExams from "@src/template/views/myExams";
import ErrorPage from "@src/template/views/errorPage";

export const CentreExamsContext = createContext<ExamListInt | null>(null);

const MyExamsPage = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    queryClient.setQueryData("pageProps", pageProps);

    return <ErrorPage />;
  }
  queryClient.setQueryData("pageProps", pageProps);

  return <MyExams />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let centre: any = {};
  const { pageId = 1 } = context.query;
  const { token, user } = getAuthData(context);
  try {
    centre = (await getCentre(context)) as CachedCentreInt;
    const { data: examList } = await request.get({
      url: `/my-exams?centreId=${centre?.id}&pageId=${pageId}`,
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
