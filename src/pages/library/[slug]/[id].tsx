import { GetServerSideProps } from "next";
import { request } from "@src/utils";
import { getCentre, pageErrorHandler } from "@src/utils";
import { BasePageProps, CachedCentreInt } from "@src/utils/interface";
import { getAuthData } from "@src/utils/auth";
// template components
import ErrorPage from "@src/template/views/errorPage";
import BookDetails from "@src/template/views/bookDetails";

const PublicationDetailsPage = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    return <ErrorPage />;
  }

  return <BookDetails />;
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
