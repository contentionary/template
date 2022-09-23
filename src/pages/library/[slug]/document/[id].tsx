import { GetServerSideProps } from "next";
import themes from "@src/themes";
import { request } from "@src/utils";
import { getCentre, pageErrorHandler } from "@src/utils";
import { BasePageProps, CachedCentreInt } from "@src/utils/interface";
import { getAuthData } from "@src/utils/auth";
import { queryClient } from "@src/pages";

const DocumentPage = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    queryClient.setQueryData("pageProps", pageProps);
    const ActiveTheme = themes[pageProps.cachedData.centre.theme]("ErrorPage");

    return <ActiveTheme />;
  }
  queryClient.setQueryData("pageProps", pageProps);
  const ActiveTheme = themes[pageProps.cachedData.centre.theme]("Document");

  return <ActiveTheme />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let centre: any = {};
  const { token, user } = getAuthData(context);
  try {
    centre = (await getCentre(context)) as CachedCentreInt;
    const { data: publication } = await request.get({
      url: `/centre/${centre.id}/publication/${id}?allowRead=true`,
      token,
    });

    return {
      props: {
        pageData: { publication },
        cachedData: { user, centre, token },
      },
    };
  } catch (err) {
    return pageErrorHandler(err, user, token, centre);
  }
};
export default DocumentPage;
