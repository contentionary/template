import { createContext } from "react";
import type { GetServerSideProps } from "next";
import { getCentre, handleError } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";
import { request } from "@src/utils";
import { getAuthData } from "../utils/auth";
//
import TemplateHome from "@src/template/views/home";

export const TemplateData = createContext<any>(null);

const HomePage = (props: BasePageProps) => {
  const { centre } = props.cachedData;
  return <TemplateHome />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const centre = await getCentre(context);
    const { user, token } = getAuthData(context);
    const { data: templateData } = await request.get({
      url: `/centre/${centre?.id}/centre-template`,
      token,
    });
    return {
      props: {
        pageData: {
          templateData,
        },
        cachedData: {
          centre,
          user,
          token,
        },
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
export default HomePage;
