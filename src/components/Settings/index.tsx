import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { BasePageProps } from "@src/utils/interface";
import { queryClient } from "@src/utils";
import Tabs from "@src/components/shared/tab";
import PasswordRest from "./passwordReset";
import Bios from "./bios";
import Toast from "@src/components/shared/toast";
import EmailReset from "./emailRest";
import ResendEmailVerification from "./emailVerification";
import { useToast } from "@src/utils/hooks/hooks";

const SettingsPage = () => {
  const { toastMessage, toggleToast } = useToast();
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const user = cachedData.user;
  const tab = ["BIOS", "CHANGE PASSWORD", "CHANGE EMAIL", "EMAIL VERIFICATION"];
  const tabPanel = [
    <Bios toggleToast={toggleToast} key={0} user={user} />,
    <PasswordRest toggleToast={toggleToast} key={1} />,
    <EmailReset toggleToast={toggleToast} key={2} />,
    <ResendEmailVerification
      toggleToast={toggleToast}
      key={3}
      centreId={cachedData.centre.id as string}
      email={user?.email}
    />,
  ];
  return (
    <Box sx={{ pt: 7, pb: 8, px: { md: 6 } }}>
      <Container maxWidth="xl">
        <Container sx={{ mt: 4 }} maxWidth="md">
          <Tabs
            tab={tab}
            tabPanel={tabPanel}
            sx={{
              background: "rgba(247, 126, 35, 0.1)",
              mt: 4,
            }}
            tabSx={{ width: 200, fontSize: 16 }}
            indicatorColor="primary"
          />

          {toastMessage && (
            <Toast
              message={toastMessage}
              status={Boolean(toggleToast)}
              showToast={toggleToast}
            />
          )}
        </Container>
      </Container>
    </Box>
  );
};

export default SettingsPage;
