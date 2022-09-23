import { GetServerSideProps } from "next";
import themes from "@src/themes";
import { request } from "@src/utils";
import { getCentre, pageErrorHandler } from "@src/utils";
import { BasePageProps, CachedCentreInt } from "@src/utils/interface";
import { getAuthData } from "../../utils/auth";
import { queryClient } from "..";

const MyPublicationPage = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    queryClient.setQueryData("pageProps", pageProps);
    const ActiveTheme = themes[pageProps.cachedData.centre.theme]("ErrorPage");

    return <ActiveTheme />;
  }
  queryClient.setQueryData("pageProps", pageProps);
  const ActiveTheme =
    themes[pageProps.cachedData.centre.theme]("MyPublications");

  return <ActiveTheme />;
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
