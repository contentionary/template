import { GetServerSideProps } from "next";
// utils and interfaces
import { request } from "@src/utils";
import { queryClient } from "@src/utils";
import { getAuthData } from "@src/utils/auth";
import { getCentre, pageErrorHandler } from "@src/utils";
import { BasePageProps, CachedCentreInt } from "@src/utils/interface";
// template components
import Library from "@src/template/views/library";
import ErrorPage from "@src/template/views/errorPage";

const LibraryPage = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    queryClient.setQueryData("pageProps", pageProps);

    return <ErrorPage />;
  }
  queryClient.setQueryData("pageProps", pageProps);

  return <Library />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let centre: any = {};
  const { pageId = 1, folderId = "" } = context.query;
  const { token, user } = getAuthData(context);
  try {
    centre = (await getCentre(context)) as CachedCentreInt;
    const { data: publicationData } = await request.get({
      url: `/centre/${centre.id}/publications?&pageId=${pageId}${
        folderId === "" ? "" : `&folderId=${folderId}`
      }`,
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
export default LibraryPage;
