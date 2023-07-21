// next js
import { GetServerSideProps } from "next";
// utils interface and styles
import { request } from "@src/utils";
import { getAuthData } from "@src/utils/auth";
import { BasePageProps, CachedCentreInt } from "@src/utils/interface";
import { queryClient, getCentre, pageErrorHandler } from "@src/utils";
// template components
import ErrorPage from "@src/template/views/errorPage";
import ExamCorrections from "@src/template/views/examCorrection";

const ExamCorrectionsPage = (pageProps: BasePageProps) => {
  queryClient.setQueryData("pageProps", pageProps);

  if (pageProps.error) {
    return <ErrorPage />;
  }

  return <ExamCorrections />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let centre: any = {};
  const { answerId } = context.query;
  const { token, user } = getAuthData(context);
  try {
    centre = (await getCentre(context)) as CachedCentreInt;
    const { data: answers } = await request.get({
      token,
      url: `/answer/${answerId}/correction`,
    });

    return {
      props: {
        pageData: { answers },
        cachedData: { user, centre, token },
      },
    };
  } catch (err) {
    return pageErrorHandler(err, user, token, centre);
  }
};
export default ExamCorrectionsPage;
