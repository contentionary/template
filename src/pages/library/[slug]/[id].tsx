import { GetServerSideProps } from "next";
import templates from "@src/templates";
import { request } from "@src/utils";
import { getCentre, pageErrorHandler } from "@src/utils";
import { BasePageProps, CachedCentreInt } from "@src/utils/interface";
import { getAuthData } from "@src/utils/auth";

const PublicationDetailsPage = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    const ActiveTemplate =
      templates[pageProps.cachedData.centre.template]("ErrorPage");

    return <ActiveTemplate />;
  }
  const ActiveTemplate =
    templates[pageProps.cachedData.centre.template]("BookDetails");

  return <ActiveTemplate />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let centre: any = {};
  const { token, user } = getAuthData(context);
  try {
    centre = (await getCentre(context)) as CachedCentreInt;
    const { data: publication, auth = null } = await request.get({
      url: `/centre/${centre.id}/publication/${id}?allowRead=false`,
      token,
    });

    return {
      props: {
        pageData: { publication, auth },
        cachedData: { user, centre, token },
      },
    };
  } catch (err) {
    return pageErrorHandler(err, user, token, centre);
  }
};
export default PublicationDetailsPage;
