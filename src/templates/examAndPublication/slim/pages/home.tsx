import ExamAndPublication from "@src/components/ExamAndPublication";
import ExamAndPublicationWrapper from "@src/components/Wrapper/ExamAndPublicationWrapper";
import { DEFAULT_LOGO, queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

const AcademyPage = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { name, logo } = cachedData.centre;

  return (
    <ExamAndPublicationWrapper
      title={`${name} Academy`}
      description={`Welcome to ${name} online academy`}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <ExamAndPublication />
    </ExamAndPublicationWrapper>
  );
};

export default AcademyPage;
