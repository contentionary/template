import { GetServerSideProps } from "next";
import themes from "@src/themes";
import { request } from "@src/utils";
import { getCentre, handleError } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";
import { getAuthData } from "../../utils/auth";
import { queryClient } from "..";

const MyPublicationPage = ({ error, ...pageProps }: BasePageProps) => {
  if (error) {
    return <h1>An error occured {error.message}</h1>;
  }
  queryClient.setQueryData("pageProps", pageProps);
  const ActiveTheme =
    themes[pageProps.cachedData.centre.theme]("MyPublications");

  return <ActiveTheme />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { pageId = 1 } = context.query;
    const centre = await getCentre(context);
    const { token, user } = getAuthData(context);
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
    return {
      props: {
        error: handleError(err),
      },
    };
  }
};
export default MyPublicationPage;
