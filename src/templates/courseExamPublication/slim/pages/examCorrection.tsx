import { DEFAULT_LOGO, queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";
import ExamCorrection from "@src/components/ExamCorrections";
import ExamAndPublicationsWrapper from "@src/components/Layout/Wrapper/ExamAndPublicationWrapper";

const ExamCompletedPage = () => {
  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { name, logo } = cachedData.centre;

  return (
    <ExamAndPublicationsWrapper
      title={name || ""}
      description="Online Exam"
      image={logo || DEFAULT_LOGO}
      showHeader={false}
      showFooter={false}
    >
      <ExamCorrection pageData={pageData} />
    </ExamAndPublicationsWrapper>
  );
};

export default ExamCompletedPage;
