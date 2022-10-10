import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
import { ButtonGroup } from "@mui/material";

const btnStyle = {
  borderRadius: 2,
  color: "#000",
  fontSize: 14,
  fontWeight: 500,
  paddingY: 1.7,
  paddingX: 3,
};
const active = {
  ...btnStyle,
  background: "#DD6E20",
  color: "#fff",
};

export default function CustomizedSteppers() {
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const { toastMessage, toggleToast } = useToast();
  const [transactionType, setTransactionType] = React.useState("all");
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const [transactions, setTransaction] = React.useState<TransactionHistory[]>(
    pageData.transactionHistory
  );

  const columns = [
    { minWidth: 50, name: "No", key: "index" },
    { minWidth: 130, name: "Date", key: "date" },
    { minWidth: 100, name: "Amount", key: "amount" },
    { minWidth: 130, name: "Balance", key: "balance" },
    { minWidth: 250, name: "Naration", key: "narration" },
    { minWidth: 70, name: "Currency", key: "currency" },
    { minWidth: 70, name: "Type", key: "type" },
    { minWidth: 250, name: "Reference", key: "reference" },
  ];

  const data = transactions.map((item, index) => ({
    index: ++index,
    date: format(new Date(item.createdAt), "dd-MM-yyy"),
    ...item,
  }));

  async function getTransactions(type: string) {
    try {
      setTransactionType(type);
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
      <Box
        sx={{
          background:
            "linear-gradient(92.54deg, #DD6E20 -14.34%, #DDA333 98.84%)",
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <CreditWallet userId={cachedData.user.id} />
          <WalletToWalletTransfer
            toggleToast={toggleToast}
            centreId={cachedData.centre.id}
          />
          <BankTransfer
            toggleToast={toggleToast}
            centreId={cachedData.centre.id}
          />
        </Box>
      </Box>
      <Box>
        <Typography variant="h4" component="p">
          Transactions
        </Typography>
        <ButtonGroup
          size="large"
          sx={{
            background: "#FAEFE8",
            mt: 2,
          }}
        >
          <ButtonComponent
            variant={transactionType === "all" ? "contained" : "text"}
            onClick={() => getTransactions("all")}
          >
            All Transactions
          </ButtonComponent>
          <ButtonComponent
            variant={transactionType === "DEBIT" ? "contained" : "text"}
            onClick={() => getTransactions("DEBIT")}
          >
            Deposits
          </ButtonComponent>
          <ButtonComponent
            variant={transactionType === "CREDIT" ? "contained" : "text"}
            onClick={() => getTransactions("CREDIT")}
          >
            Withdrawals
          </ButtonComponent>
        </ButtonGroup>
      </Box>
      <Box sx={{ width: { xs: 420, md: "100%" } }}>
        <MuiTable data={data} columns={columns} bgColor="#F7F7F7" />
      </Box>
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
