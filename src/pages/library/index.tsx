import { GetServerSideProps } from "next";
import themes from "@src/themes";
import { request } from "@src/utils";
import { getCentre, handleError } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";
import { getAuthData } from "../../utils/auth";
import { queryClient } from "..";

const LibraryPage = ({ error, ...pageProps }: BasePageProps) => {
  if (error) {
    return <h1>An error occurred {error.message}</h1>;
  }
  queryClient.setQueryData("pageProps", pageProps);
  const ActiveTheme = themes[pageProps.cachedData.centre.theme]("Library");

  return <ActiveTheme />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { pageId = 1 } = context.query;
    const centre = await getCentre(context);
    const { token, user } = getAuthData(context);
    const { data: publicationData } = await request.get({
      url: `/centre/${centre.id}/publications?pageId=${pageId}`,
      token,
    });

    return {
      props: {
        pageData: { publicationData },
        cachedData: { user, centre, token },
      },
    };
  } catch (err) {
    return {
      props: {
        error: handleError(err),
      },
    };
  }
};
export default LibraryPage;
