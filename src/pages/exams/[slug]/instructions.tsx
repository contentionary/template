// next js
import { GetServerSideProps } from "next";
// utils interface and styles
import { request } from "@src/utils";
import { getAuthData } from "@src/utils/auth";
import { BasePageProps, CachedCentreInt } from "@src/utils/interface";
import { queryClient, getCentre, pageErrorHandler } from "@src/utils";
// template components
import ErrorPage from "@src/template/views/errorPage";
import ExamInstructions from "@src/template/views/examInstructions";

const ExamPage = (pageProps: BasePageProps) => {
  queryClient.setQueryData("pageProps", pageProps);

  if (pageProps.error) {
    return <ErrorPage />;
  }

  return <ExamInstructions />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let centre: any = {};
  const { slug } = context.query;
  const { token, user } = getAuthData(context);
  try {
    centre = (await getCentre(context)) as CachedCentreInt;
    const { data: exam, auth = null } = await request.get({
      token,
      isRelativeUrl: true,
      url: `/centre/${centre.id}/exam/${slug?.slice(-36)}`,
    });

    return {
      props: {
        pageData: { exam, auth },
        cachedData: { user, centre, token },
      },
    };
  } catch (err) {
    return pageErrorHandler(err, user, token, centre);
  }
};
export default ExamPage;
