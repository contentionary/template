import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { Box, Typography } from "@mui/material";
import { handleError, queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";
import CreditWallet from "./creditWallet";
import WalletToWalletTransfer from "./walletToWalletTransfer";
import BankTransfer from "./walletToBankTransfer";
import MuiTable from "@src/components/shared/table";
import { format } from "date-fns";
import ButtonComponent from "@src/components/shared/button";
import { useToast } from "@src/utils/hooks";
import dynamic from "next/dynamic";
import { TransactionHistory } from "./interface";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "#F57E27",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "#F57E27",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#D9D9D9",
    borderRadius: 1,
  },
}));
const bg = "linear-gradient(92.54deg, #DD6E20 -14.34%, #DDA333 98.84%)";
const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage: bg,
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage: "#F57E27",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <HomeOutlined />,
    2: <AdminPanelSettingsOutlinedIcon />,
    3: <AccountBalanceWalletOutlinedIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ["Home", "Admin", "Wallet"];

export default function CustomizedSteppers() {
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const { toastMessage, toggleToast } = useToast();
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const [transactions, setTransaction] = React.useState<TransactionHistory[]>(
    pageData.transactionHistory
  );

  const columns = [
    "index",
    "date",
    "balance",
    "amount",
    "reference",
    "currency",
    "narration",
    "type",
  ];

  const data = transactions.map((item, index) => ({
    index: index++,
    date: format(new Date(item.createdAt), "dd-MM-yyy"),
    ...item,
  }));

  async function getTransactions(type: string) {
    try {
      if (type === "all") {
        setTransaction([...pageData.transactionHistory]);
      } else {
        setTransaction(
          pageData.transactionHistory.filter(
            (transaction: TransactionHistory) => transaction.type === type
          )
        );
      }
      // const { data } = await request.get({
      //   url: `/wallet/history?centreId=${cachedData.centre.id}&type=${type}`,
      // });
    } catch (error) {
      toggleToast(handleError(error).message);
    }
  }
  return (
    <Stack spacing={4} marginTop={4}>
      <Stepper
        sx={{ width: { xs: "100%", md: 700 } }}
        alternativeLabel
        activeStep={2}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        sx={{
          background: bg,
          padding: 3,
          width: { xs: "100%", md: 800 },
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          component="p"
          style={{ color: "#fff", marginBottom: 20 }}
        >
          Wallet Balance
        </Typography>
        <Typography
          variant="h4"
          component="p"
          style={{ color: "#fff", marginBottom: 20 }}
        >
          NGN {pageData.walletBalance.usdBalance}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <CreditWallet userId={cachedData.user.id} />
          <WalletToWalletTransfer toggleToast={toggleToast} />
          <BankTransfer toggleToast={toggleToast} />
        </Box>
      </Box>
      <Box>
        <Typography variant="h4" component="p">
          Transactions
        </Typography>
        <Box sx={{ background: "#FAEFE8", width: 390 }}>
          <ButtonComponent onClick={() => getTransactions("all")}>
            All Transactions
          </ButtonComponent>
          <ButtonComponent onClick={() => getTransactions("DEBIT")}>
            Deposits
          </ButtonComponent>
          <ButtonComponent onClick={() => getTransactions("CREDIT")}>
            Withdrawals
          </ButtonComponent>
        </Box>
      </Box>
      <MuiTable data={data} columns={columns} />
      {toastMessage && (
        <Toast
          message={toastMessage}
          status={Boolean(toastMessage)}
          showToast={toggleToast}
        />
      )}
    </Stack>
  );
}
