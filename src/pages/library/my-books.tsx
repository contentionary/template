import { GetServerSideProps } from "next";
//
import { getAuthData } from "@src/utils/auth";
import { queryClient, request } from "@src/utils";
import { getCentre, pageErrorHandler } from "@src/utils";
import { BasePageProps, CachedCentreInt } from "@src/utils/interface";
// template components
import ErrorPage from "@src/template/views/errorPage";
import MyPublications from "@src/template/views/myPublication";
//

const MyPublicationPage = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    queryClient.setQueryData("pageProps", pageProps);

    return <ErrorPage />;
  }

  queryClient.setQueryData("pageProps", pageProps);

  return <MyPublications />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let centre: any = {};
  const { pageId = 1 } = context.query;
  const { token, user } = getAuthData(context);
  try {
    centre = (await getCentre(context)) as CachedCentreInt;
    const { data: publicationData } = await request.get({
      url: `/my-publications?pageId=${pageId}&centreId=${centre.id}`,
      token,
    });

    return {
      props: {
        pageData: { publicationData },
        cachedData: { user, centre, token },
      },
    };
  } catch (err) {
    return pageErrorHandler(err, user, token, centre);
  }
};
export default MyPublicationPage;
