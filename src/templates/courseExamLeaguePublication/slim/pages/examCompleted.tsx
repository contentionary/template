import { DEFAULT_LOGO, queryClient } from "@src/utils";
import { BasePageProps, ExamInt } from "@src/utils/interface";
import ExamCompleted from "@src/components/ExamCompleted";
import ExamAndLeagueWrapper from "@src/components/Wrapper/ExamAndLeagueWrapper";

const ExamCompletedPage = () => {
  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { name, logo } = cachedData.centre;
  const exam = pageData.exam as ExamInt;

  return (
    <ExamAndLeagueWrapper
      title={name || ""}
      description={exam?.description || "Online Exam"}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <ExamCompleted exam={exam} auth={pageData.auth} />
    </ExamAndLeagueWrapper>
  );
};

export default ExamCompletedPage;
