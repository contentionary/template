import type { NextPage } from "next";
import Academy from "@src/components/Academy";
import Wrapper from "@src/components/Wrapper";

const AcademyPage: NextPage = () => {
  return (
    <Wrapper
      title="Contentionary | Academy"
      description="Welcome to contentionary"
      image="/public/images/logo.png"
      showHeader={true}
      showFooter={true}
    >
      <Academy />
    </Wrapper>
  );
};

export default AcademyPage;
