import { DEFAULT_LOGO, queryClient } from "@src/utils";
import { BasePageProps, ExamInt } from "@src/utils/interface";
import StartExamPage from "@src/components/ExamStarted";
import CourseExamLeaguePublicationWrapper from "@src/components/Wrapper/CourseExamLeaguePublicationWrapper";

const StartExam = () => {
  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { name, logo, id } = cachedData.centre;
  const exam = pageData.exam as ExamInt;

  return (
    <CourseExamLeaguePublicationWrapper
      title={name || ""}
      description={exam?.description || "Online Exam"}
      image={logo || DEFAULT_LOGO}
      showHeader={false}
      showFooter={false}
    >
      <StartExamPage exam={exam} centerId={id} auth={pageData.auth} />
    </CourseExamLeaguePublicationWrapper>
  );
};

export default StartExam;
