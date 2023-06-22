import PortfolioDetail from "@src/components/manageDomain/portfolioDetail";
import Wrapper from "@src/components/manageDomain";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";

const PortfolioDetailPage = () => {
  return (
    <Wrapper>
      <PortfolioDetail />
    </Wrapper>
  );
};

export default PortfolioDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context, true)) as CachedCentreInt;
    const { data } = await request.get({
      url: `/centre/${centre.id}/portfolio-details`,
      token,
    });
    console.log(data);
    return {
      props: {
        pageData: { portfolioList: data },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
