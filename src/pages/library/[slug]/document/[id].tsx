import { GetServerSideProps } from "next";
import themes from "@src/themes";
import { request } from "@src/utils";
import { getCentre, handleError } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";
import { getAuthData } from "@src/utils/auth";
import { queryClient } from "@src/pages";

const DocumentPage = ({ error, ...pageProps }: BasePageProps) => {
  if (error) {
    return <h1>An error occurred {error.message}</h1>;
  }
  queryClient.setQueryData("pageProps", pageProps);
  const ActiveTheme = themes[pageProps.cachedData.centre.theme]("Document");

  return <ActiveTheme />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.query;
    const centre = await getCentre(context);
    const { token, user } = getAuthData(context);
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
    return {
      props: {
        error: handleError(err),
      },
    };
  }
};
export default DocumentPage;
