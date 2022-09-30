// next components
import Error from "next/error";
import type { GetServerSideProps } from "next";
//
import themes from "@src/templates";
import { request } from "@src/utils";
import { getAuthData } from "../utils/auth";
import { getCentre, pageErrorHandler } from "@src/utils";
import { BasePageProps, CachedCentreInt } from "@src/utils/interface";
import { queryClient } from "@src/utils";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let centre: any = {};
  const { user, token } = getAuthData(context);
  try {
    centre = (await getCentre(context)) as CachedCentreInt;
    const { data: templateData } = await request.get({
      url: `/centre/${centre?.id}/centre-template`,
      token,
    });

    return {
      props: {
        pageData: { templateData },
        cachedData: { centre, user, token },
      },
    };
  } catch (err) {
    return pageErrorHandler(err, user, token, centre);
  }
};

const Page = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    queryClient.setQueryData("pageProps", pageProps);
    const ActiveTemplate =
      themes[pageProps.cachedData.centre.template]("ErrorPage");

    return <ActiveTemplate />;
  }
  queryClient.setQueryData("pageProps", pageProps);
  const ActiveTemplate =
    themes[pageProps.cachedData.centre.template]("ErrorPage");

  return <ActiveTemplate />;
};

export default Page;
