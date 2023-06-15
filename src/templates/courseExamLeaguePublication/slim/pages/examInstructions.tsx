import { DEFAULT_LOGO, queryClient } from "@src/utils";
import ExamInstructionsPage from "@src/components/ExamInstructions";
import { BasePageProps, ExamInt } from "@src/utils/interface";
import CourseExamLeaguePublicationWrapper from "@src/components/Wrapper/CourseExamLeaguePublicationWrapper";

const ExamInstructions = () => {
  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { name, logo } = cachedData.centre;
  const exam = pageData.exam as ExamInt;

  return (
    <CourseExamLeaguePublicationWrapper
      title={name || ""}
      description={exam?.description || "Online Exam"}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <ExamInstructionsPage exam={exam} auth={pageData.auth} />
    </CourseExamLeaguePublicationWrapper>
  );
};

export default ExamInstructions;
