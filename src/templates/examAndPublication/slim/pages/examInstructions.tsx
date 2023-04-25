import { DEFAULT_LOGO, queryClient } from "@src/utils";
import ExamInstructionsPage from "@src/components/ExamInstructions";
import { BasePageProps, ExamInt } from "@src/utils/interface";
import ExamAndPublicationsWrapper from "@src/components/Wrapper/ExamAndPublicationWrapper";

const ExamInstructions = () => {
  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { name, logo } = cachedData.centre;
  const exam = pageData.exam as ExamInt;

  return (
    <ExamAndPublicationsWrapper
      title={name || ""}
      description={exam?.description || "Online Exam"}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <ExamInstructionsPage exam={exam} auth={pageData.auth} />
    </ExamAndPublicationsWrapper>
  );
};

export default ExamInstructions;
