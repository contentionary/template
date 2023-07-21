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
import ErrorPage from "@src/template/views/errorPage";
import MyResults from "@src/template/views/myResults";

export const CentreResultsContext = createContext<ExamListInt | null>(null);

const MyResultsPage = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    queryClient.setQueryData("pageProps", pageProps);

    return <ErrorPage />;
  }
  queryClient.setQueryData("pageProps", pageProps);

  return <MyResults />;
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
export default MyResultsPage;
