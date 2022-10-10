import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { handleError, isServerSide, queryClient, request } from "@src/utils";
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
import { useRouter } from "next/router";

export default function CustomizedSteppers() {
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const ConfirmPayment = dynamic(
    () => import("@src/components/payment/confirmPayment")
  );
  const { toastMessage, toggleToast } = useToast();
  const [transactionType, setTransactionType] = React.useState("all");
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const [transactions, setTransaction] = React.useState<TransactionHistory[]>(
    pageData.transactionHistory
  );
  const router = useRouter();
  const { walletBalance } = pageData;
  const pockets = Object.keys(walletBalance.pockets);
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
        const { data } = await request.get({
          url: `/wallet/centre/${cachedData.centre.id}/transaction-history?type=${type}`,
        });
        setTransaction([...(data as TransactionHistory[])]);
      }
    } catch (error) {
      toggleToast(handleError(error).message);
    }
  }
  return (
    <div>
      {router.query.reference && (
        <ConfirmPayment
          reference={router.query.reference}
          price={Number(router.query.price)}
          redirectUrl={isServerSide ? "" : window.location.href}
        />
      )}
      <Stack spacing={4} marginTop={4}>
        <Stack direction={{ md: "row" }} spacing={4}>
          <Box
            sx={{
              background:
                "linear-gradient(92.54deg, #DD6E20 -14.34%, #DDA333 98.84%)",
              padding: 3,
              width: { xs: "100%", md: "75%" },
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
            <Box sx={{ display: "flex" }}>
              {pockets.map((pocket, index) => (
                <Typography
                  key={`${pocket}-${index}`}
                  variant="h4"
                  component="p"
                  style={{ color: "#fff", marginBottom: 20, marginRight: 30 }}
                >
                  {walletBalance.pockets[pocket].symbol}
                  {walletBalance.pockets[pocket].balance}
                </Typography>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <CreditWallet centreId={cachedData.centre.id} />
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
          <Box
            sx={{
              background: "#FAEFE8",
              mt: { xs: 4 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              borderRadius: 3,
              padding: 4,
              width: { xs: "100%", md: "25%" },
            }}
          >
            <Typography
              variant="h4"
              component="p"
              color=""
              style={{
                marginBottom: 20,
                color: "#DD6E20",
              }}
            >
              Total balance in USD
            </Typography>
            <Typography
              variant="h4"
              component="p"
              style={{ marginBottom: 20, color: "#DD6E20" }}
            >
              ${walletBalance.usdBalance}
            </Typography>
          </Box>
        </Stack>

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
              variant={transactionType === "CREDIT" ? "contained" : "text"}
              onClick={() => getTransactions("CREDIT")}
            >
              Deposits
            </ButtonComponent>
            <ButtonComponent
              variant={transactionType === "DEBIT" ? "contained" : "text"}
              onClick={() => getTransactions("DEBIT")}
            >
              Withdrawals
            </ButtonComponent>
          </ButtonGroup>
        </Box>
        <Box sx={{ width: { xs: 400, md: "100%" } }}>
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
    </div>
  );
}
