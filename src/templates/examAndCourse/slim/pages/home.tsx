import ExamAndCourse from "@src/components/ExamAndCourse";
import ExamAndCourseWrapper from "@src/components/Wrapper/ExamAndCourseWrapper";
import { DEFAULT_LOGO, queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

const AcademyPage = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { name, logo } = cachedData.centre;
  return (
    <ExamAndCourseWrapper
      title={`${name} Academy`}
      description={`Welcome to ${name} online academy`}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <ExamAndCourse />
    </ExamAndCourseWrapper>
  );
};

export default AcademyPage;
