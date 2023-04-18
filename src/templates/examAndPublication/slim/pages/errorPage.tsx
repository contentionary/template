import PageError from "@src/components/shared/state/PageError";
import ExamAndCourseWrapper from "@src/components/Wrapper/ExamAndCourseWrapper";

const ErrorPage = () => {
  return (
    <ExamAndCourseWrapper
      title="Edtify | Academy"
      description="Welcome to Edtify"
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <PageError />
    </ExamAndCourseWrapper>
  );
};

export default ErrorPage;
