import Academy from "@src/components/Academy";
import AcademyWrapper from "@src/components/Wrapper/AcademyWrapper";
import { DEFAULT_LOGO, queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

const AcademyPage = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { name, logo } = cachedData.centre;

  return (
    <AcademyWrapper
      title={`${name} Academy`}
      description={`Welcome to ${name} online academy`}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <Academy />
    </AcademyWrapper>
  );
};

export default AcademyPage;
