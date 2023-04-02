import * as React from "react";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CopyAllOutlined from "@mui/icons-material/CopyAllOutlined";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import dynamic from "next/dynamic";

import {
  copy,
  handleError,
  isServerSide,
  queryClient,
  request,
} from "@src/utils";
import { BasePageProps } from "@src/utils/interface";
import { TransactionHistory } from "./interface";
import { ButtonGroup } from "@mui/material";
import { useRouter } from "next/router";
import { useToast } from "@src/utils/hooks";

import ButtonComponent from "@src/components/shared/button";
import MuiTable from "@src/components/shared/table";
import ExportMenu from "@src/components/shared/export";
interface CurrencyType {
  name: string;
  abbr: string;
  country: string;
  flag: string;
  ios2: string;
  paymentService: object;
}
export default function CustomizedSteppers() {
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const ConfirmPayment = dynamic(
    () => import("@src/components/payment/confirmPayment")
  );
  const BankTransfer = dynamic(() => import("./walletToBankTransfer"));
  const WalletToWalletTransfer = dynamic(
    () => import("./walletToWalletTransfer")
  );
  const CreditWallet = dynamic(() => import("./creditWallet"));

  const { toastMessage, toggleToast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [currencies, setCurrencies] = React.useState<Array<CurrencyType>>([]);
  const [currency, setCurrency] = React.useState("");
  const [transactionType, setTransactionType] = React.useState("all");
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const [transactions, setTransaction] = React.useState<TransactionHistory[]>(
    pageData.transactionHistory.histories
  );
  const [pageCount, setPageCount] = React.useState(
    pageData.transactionHistory.pageCount
  );
  const router = useRouter();
  const locationUrl = isServerSide ? "" : window.location.href;
  const centreWallet = locationUrl.includes("admin");
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

  const data = transactions?.map((item, index) => ({
    index: ++index,
    ...item,
  }));
  async function getTransactions(
    type: string,
    pageId: number,
    currencyValue?: string
  ) {
    try {
      let newCurrency = currencyValue ? currencyValue : currency;
      setTransactionType(type);
      const url = centreWallet
        ? `/wallet/centre/${cachedData.centre.id}/transaction-history?pageId=${pageId}`
        : `/wallet/transaction-history?pageId=${pageId}`;

      if (type === "all") {
        if (newCurrency != "all") {
          setIsLoading(true);
          const { data } = await request.get({
            url: `${url}&currency=${newCurrency}`,
          });
          setPageCount(data.pageCount);
          setTransaction([...(data.histories as TransactionHistory[])]);
          setIsLoading(false);
        } else {
          const { data } = await request.get({
            url,
          });
          setPageCount(data.pageCount);
          setTransaction([...(data.histories as TransactionHistory[])]);
        }
      } else {
        setIsLoading(true);
        const { data } = await request.get({
          url:
            newCurrency && newCurrency != "all"
              ? `${url}&type=${type}&currency=${newCurrency}`
              : `${url}&type=${type}`,
        });
        setPageCount(data.pageCount);
        setTransaction([...(data.histories as TransactionHistory[])]);
        setIsLoading(false);
      }
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    getTransactions(transactionType, value);
  };

  async function getSupportedCurrency() {
    try {
      setIsLoading(true);
      const { data } = await request.get({
        url: "/wallet/supported-currencies",
      });
      setCurrencies([...(data as CurrencyType[])]);
      setIsLoading(false);
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    getSupportedCurrency();
  }, []);

  const handleCurrencyChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value);
    getTransactions(transactionType, 1, event.target.value);
  };

  return (
    <Box sx={{ pt: 7, pb: 8, px: { md: 6 } }}>
      <Container maxWidth="xl">
        {router.query.reference && (
          <ConfirmPayment
            reference={router.query.reference}
            price={Number(router.query.price)}
            redirectUrl={locationUrl}
          />
        )}
        <Stack spacing={4} marginTop={4}>
          <Stack direction={{ md: "row" }} spacing={4}>
            <Box
              sx={{
                padding: 3,
                width: { xs: "100%", md: "75%" },
                borderRadius: 3,
                background: cachedData.centre.primaryColor || "#DD6E20",
              }}
            >
              {" "}
              <Typography
                variant="h5"
                component="p"
                style={{ color: "#fff", marginBottom: 20 }}
              >
                ID: {centreWallet ? cachedData.centre.id : cachedData.user.id}{" "}
                <CopyAllOutlined
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    copy(
                      centreWallet ? cachedData.centre.id : cachedData.user.id
                    );
                    toggleToast("copied!");
                  }}
                />
              </Typography>
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
                <CreditWallet
                  toggleToast={toggleToast}
                  itemId={
                    centreWallet ? cachedData.centre.id : cachedData.user.id
                  }
                />
                <WalletToWalletTransfer
                  toggleToast={toggleToast}
                  centreId={cachedData.centre.id}
                  centreWallet={centreWallet}
                />
                <BankTransfer
                  toggleToast={toggleToast}
                  centreId={cachedData.centre.id}
                  centreWallet={centreWallet}
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
                variant="h5"
                component="p"
                color="primary"
                sx={{
                  marginBottom: 2,
                }}
              >
                Total balance in USD
              </Typography>
              <Typography
                variant="h4"
                component="p"
                color="primary"
                sx={{ marginBottom: 2 }}
              >
                ${walletBalance.usdBalance}
              </Typography>
            </Box>
          </Stack>

          <Box>
            <Typography variant="h4" component="p">
              Transactions
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" spacing={1}>
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Filter
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Filter"
                    value={currency}
                    onChange={handleCurrencyChange}
                    size="small"
                  >
                    <MenuItem value="all">All</MenuItem>
                    {currencies.map((currency) => (
                      <MenuItem key={currency.name} value={currency.abbr}>
                        {currency.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <ButtonGroup
                  size="large"
                  sx={{
                    background: "#FAEFE8",
                    mt: 2,
                  }}
                >
                  <ButtonComponent
                    variant={transactionType === "all" ? "contained" : "text"}
                    onClick={() => getTransactions("all", 1)}
                  >
                    All Transactions
                  </ButtonComponent>
                  <ButtonComponent
                    variant={
                      transactionType === "CREDIT" ? "contained" : "text"
                    }
                    onClick={() => getTransactions("CREDIT", 1)}
                  >
                    Deposits
                  </ButtonComponent>
                  <ButtonComponent
                    variant={transactionType === "DEBIT" ? "contained" : "text"}
                    onClick={() => getTransactions("DEBIT", 1)}
                  >
                    Withdrawals
                  </ButtonComponent>
                </ButtonGroup>
              </Stack>
              <ExportMenu
                url={`wallet/user/${
                  centreWallet ? cachedData.centre.id : cachedData.user.id
                }/transaction-history`}
              />
            </Box>
          </Box>

          <Box sx={{ width: { xs: "100%" } }}>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                <MuiTable data={data} columns={columns} bgColor="#F7F7F7" />
                <Stack
                  py={4}
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                >
                  {pageCount > 1 && (
                    <Pagination
                      count={pageCount}
                      onChange={handleChange}
                      shape="rounded"
                      size="large"
                    />
                  )}
                </Stack>
              </>
            )}
          </Box>

          {toastMessage && (
            <Toast
              message={toastMessage}
              status={Boolean(toastMessage)}
              showToast={toggleToast}
            />
          )}
        </Stack>
      </Container>
    </Box>
  );
}
