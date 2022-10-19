import PageError from "@src/components/shared/state/PageError";
import ExamAndCourseWrapper from "@src/components/Wrapper/ExamAndCourseWrapper";

const ErrorPage = () => {
  return (
    <ExamAndCourseWrapper
      title="Contentionary | Academy"
      description="Welcome to contentionary"
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <PageError />
    </ExamAndCourseWrapper>
  );
};

export default ErrorPage;
