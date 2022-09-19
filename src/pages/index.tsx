import { createContext } from "react";
import type { GetServerSideProps } from "next";
import themes from "@src/themes";
import { getCentre, handleError } from "@src/utils";
import { BasePageProps, TemplateDataInt } from "@src/utils/interface";
import { request } from "@src/utils";

interface PageProps extends BasePageProps {
  templateData: TemplateDataInt;
}

export const TemplateData = createContext<TemplateDataInt | null>(null);

const HomePage = ({ centre, templateData }: PageProps) => {
  const ActiveTheme = themes[centre.theme]("Home");
  return (
    <TemplateData.Provider value={templateData}>
      <ActiveTheme />
    </TemplateData.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const centre = await getCentre(context);
    const { data: templateData } = await request.get(
      `/centre/${centre.id}/centre-template`
    );

    return {
      props: { centre, templateData },
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
