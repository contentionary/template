import { GetServerSideProps } from "next";
import themes from "@src/templates";
import { request } from "@src/utils";
import { getCentre, pageErrorHandler } from "@src/utils";
import { BasePageProps, CachedCentreInt } from "@src/utils/interface";
import { getAuthData } from "@src/utils/auth";
import LeaguePage from "@src/components/leagueDetails";

const ExamDetailsPage = (pageProps: BasePageProps) => {
  return <LeaguePage />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let centre: any = {};
  const { slug } = context.query;
  const { token, user } = getAuthData(context);
  try {
    centre = (await getCentre(context)) as CachedCentreInt;
    const { data: league, auth = null } = await request.get({
      token,
      isRelativeUrl: true,
      url: `/league/${slug?.slice(-36)}`,
    });

    return {
      props: {
        pageData: { league, auth },
        cachedData: { user, centre, token },
      },
    };
  } catch (err) {
    return pageErrorHandler(err, user, token, centre);
  }
};
export default ExamDetailsPage;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   let centre: any = {};
//   const { slug } = context.query;
//   const { token, user } = getAuthData(context);
//   try {
//     centre = (await getCentre(context)) as CachedCentreInt;
//     const { data: exam, auth = null } = await request.get({
//       token,
//       isRelativeUrl: true,
//       url: `/league/${slug?.slice(-36)}`,
//     });

//     return {
//       props: {
//         pageData: { exam, auth },
//         cachedData: { user, centre, token },
//       },
//     };
//   } catch (err) {
//     return pageErrorHandler(err, user, token, centre);
//   }
// };

// const ExamDetailsPage = (pageProps: BasePageProps) => {
//   if (pageProps.error) {
//     const ActiveTemplate =
//       themes[pageProps.cachedData.centre.template]("ErrorPage");

//     return <ActiveTemplate />;
//   }
//   const ActiveTemplate =
//     themes[pageProps.cachedData.centre.template]("ExamDetails");

//   return <ActiveTemplate />;
// };
