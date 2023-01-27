import { GetServerSideProps } from "next";
import themes from "@src/templates";
import { request } from "@src/utils";
import { getCentre, pageErrorHandler } from "@src/utils";
import { BasePageProps, CachedCentreInt } from "@src/utils/interface";
import { getAuthData } from "@src/utils/auth";

const FinishExamPage = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    const ActiveTemplate =
      themes[pageProps.cachedData.centre.template]("ErrorPage");

    return <ActiveTemplate />;
  }
  const ActiveTemplate =
    themes[pageProps.cachedData.centre.template]("ExamCorrection");

  return <ActiveTemplate />;
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
export default FinishExamPage;
