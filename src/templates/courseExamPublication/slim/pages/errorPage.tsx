import PageError from "@src/components/shared/state/PageError";
import ExamAndPublicationsWrapper from "@src/components/Layout/Wrapper/ExamAndPublicationWrapper";

const ErrorPage = () => {
  return (
    <ExamAndPublicationsWrapper
      title="Edtify | Academy"
      description="Welcome to Edtify"
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <PageError />
    </ExamAndPublicationsWrapper>
  );
};

export default ErrorPage;
