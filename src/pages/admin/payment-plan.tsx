import Wrapper from "@src/components/manageDomain";
import { getCentre, handleError } from "@src/utils";
import PaymentPlan from "@src/components/manageDomain/paymentPlan";
import Container from "@mui/material/Container";
import ServerSideErrorMessage from "@src/components/shared/state/PageError";
import Box from "@mui/material/Box";
import { getAuthData } from "@src/utils/auth";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";

interface Props {
  error: any;
}

const CentrePaymentPlan = ({ error }: Props): JSX.Element => {
  return (
    <Wrapper>
      <Box
        component="section"
        sx={{ pt: 4, px: { md: 6 }, pb: 8 }}
        className="hero-section"
      >
        <Container maxWidth="xl">
          {error ? <ServerSideErrorMessage /> : <PaymentPlan />}
        </Container>
      </Box>
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context, true)) as CachedCentreInt;
    return {
      props: {
        cachedData: { user, centre, token },
        // user,
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
export default CentrePaymentPlan;
