import Academy from "@src/components/Academy";
import AcademyWrapper from "@src/components/Wrapper/AcademyWrapper";

const AcademyPage = () => {
  return (
    <AcademyWrapper
      title="Contentionary | Academy"
      description="Welcome to contentionary"
      image="/public/images/logo.png"
      showHeader={true}
      showFooter={true}
    >
      <Academy />
    </AcademyWrapper>
  );
};

export default AcademyPage;
