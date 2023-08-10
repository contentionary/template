import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";

import dynamic from "next/dynamic";

import useForm from "@src/utils/hooks/useForm";
import ButtonComponent from "@src/template/components/shared/button";
import Dialog from "@src/template/components/shared/dialog";
import TextFields from "@src/template/components/shared/input/textField";

import { useDialog } from "@src/utils/hooks";
import { handleError, request } from "@src/utils";
import { useState } from "react";
import { TextField } from "@mui/material";
import { CurrencyType } from "./interface";

interface BankType {
  name: string;
  bankCode: string | null;
}

const BankTransfer = ({
  toggleToast,
  centreId,
  centreWallet,
}: {
  toggleToast: Function;
  centreId: string;
  centreWallet: boolean;
}) => {
  const Loading = dynamic(
    () => import("@src/template/components/shared/loading")
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingAccountName, setIsGettingAccountName] = useState(false);
  const { values, getData, submit } = useForm(Transfer);
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [confirm, setConfirm] = useState(false);
  const [banks, setBanks] = useState<Array<BankType>>([]);
  const [currencies, setCurrencies] = useState<Array<CurrencyType>>([]);
  const [accountName, setAccountName] = useState("");
  const [message, setMessage] = useState("");

  async function Transfer() {
    setConfirm(true);
  }
  async function confirmTransfer() {
    try {
      setIsLoading(true);
      values.accountName = accountName;
      await request.post({
        url: centreWallet
          ? `/wallet/centre/${centreId}/bank-transfer`
          : "/wallet/bank-transfer",
        data: { ...values, amount: values.amount * 100 },
      });
      toggleToast("Transaction successful");
      setIsLoading(false);
      closeDialog();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }
  const getAccountName = async (accountName: string) => {
    try {
      setIsGettingAccountName(true);
      values.accountNumber = accountName;
      const { data } = await request.post({
        url: "/wallet/verify-bank-account",
        data: {
          accountNumber: values.accountNumber,
          bankCode: values.bankCode,
          currency: values.currency,
        },
      });
      setMessage("");
      setAccountName(data.accountName);
      setIsGettingAccountName(false);
    } catch (error) {
      setAccountName("");
      setMessage(handleError(error).message);
      setIsGettingAccountName(false);
    }
  };

  async function getBank(value: string | null) {
    try {
      setIsLoading(true);
      const { data } = await request.get({
        url: `/transaction/${value}/supported-banks`,
      });
      data.pop();
      setBanks([...(data as BankType[])]);
      values.currency = value;
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }
  async function getSupportedCurrency() {
    try {
      setIsLoading(true);
      const { data } = await request.get({
        url: "/wallet/supported-currencies",
      });
      data.pop();
      setCurrencies([...(data as CurrencyType[])]);
      setIsLoading(false);
      openDialog();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <ButtonComponent
        sx={{
          border: "solid 1px #dbdbdb ",
          color: "#fff",
          paddingY: 1.8,
          paddingX: 3,
        }}
        onClick={() => {
          getSupportedCurrency();
        }}
      >
        <>
          <AccountBalanceOutlinedIcon />
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: "#fff",
              marginLeft: 1,
              fontSize: { xs: 16, md: 20, lg: 16 },
            }}
          >
            Wallet to Bank Transfer
          </Typography>
        </>
      </ButtonComponent>
      <Dialog
        title="Wallet to bank transfer"
        isOpen={isOpen}
        closeDialog={closeDialog}
        message="Kindly make sure you enter a correct Account details"
        content={
          <Box mt={2}>
            {!confirm ? (
              <form onSubmit={(e) => submit(e)}>
                <Autocomplete
                  id="currency"
                  options={currencies}
                  autoHighlight
                  onChange={(event: any, newValue: CurrencyType | null) => {
                    values.currency = newValue?.abbr;
                    getBank(newValue ? newValue.abbr : "");
                  }}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose a Currency"
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />

                <TextFields
                  type="number"
                  label="Amount"
                  name="amount"
                  defaultValue={values.amount}
                  onChange={getData}
                  sx={{ width: "100%", marginTop: 3, mb: 3 }}
                  required
                />
                <Autocomplete
                  id="bankCode"
                  options={banks}
                  autoHighlight
                  onChange={(event: any, newValue: BankType | null) => {
                    values.bankCode = newValue?.bankCode;
                  }}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Bank Name"
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
                <TextFields
                  type="number"
                  label="Account number"
                  name="accountNumber"
                  onChange={(e: any) =>
                    e.target.value.length === 10 &&
                    getAccountName(e.target.value)
                  }
                  defaultValue={values.accountNumber}
                  sx={{ width: "100%", marginTop: 3 }}
                  inputProps={{ maxLength: 10 }}
                  required
                />
                <Typography
                  variant="subtitle2"
                  component="div"
                  style={{ textAlign: "right", marginTop: 5 }}
                >
                  {message && message}
                  {accountName && accountName}
                  {isGettingAccountName && <Loading sx={{ ml: 1 }} size={15} />}
                </Typography>
                <TextFields
                  type="text"
                  label="Narration"
                  name="narration"
                  onChange={getData}
                  defaultValue={values.narration}
                  sx={{ width: "100%", marginTop: 3 }}
                />
                <div style={{ textAlign: "right" }}>
                  {accountName ? (
                    <ButtonComponent type="submit">
                      <>
                        Transfer
                        {isLoading && <Loading sx={{ ml: 1 }} size={15} />}
                      </>
                    </ButtonComponent>
                  ) : (
                    <span style={{ color: "#555555", cursor: "not-allowed" }}>
                      Transfer
                    </span>
                  )}
                  <ButtonComponent onClick={() => closeDialog()} type="submit">
                    Cancel
                  </ButtonComponent>
                </div>
              </form>
            ) : (
              <Box>
                <Typography>
                  You are sending <strong>{values.amount}</strong> to account
                  number <strong>{values.accountNumber}</strong> with the name{" "}
                  <strong>{values.accountName}</strong>
                </Typography>

                <div style={{ textAlign: "right", marginTop: 20 }}>
                  <ButtonComponent onClick={() => confirmTransfer()}>
                    <>
                      Confirm transaction
                      {isLoading && <Loading sx={{ ml: 1 }} size={15} />}
                    </>
                  </ButtonComponent>
                  <ButtonComponent onClick={() => setConfirm(false)}>
                    Cancel
                  </ButtonComponent>
                </div>
              </Box>
            )}
          </Box>
        }
      />
    </>
  );
};

export default BankTransfer;
