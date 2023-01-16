import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";

import dynamic from "next/dynamic";

import useForm from "@src/hooks/useForm";
import ButtonComponent from "@src/components/shared/button";
import Dialog from "@src/components/shared/dialog";
import TextFields from "@src/components/shared/input/textField";

import { useDialog } from "@src/hooks";
import { handleError, request } from "@src/utils";
import { useState } from "react";
import { TextField } from "@mui/material";

interface CurrencyType {
  name: string;
  abbr: string;
  country: string;
  flag: string;
  ios2: string;
  paymentService: object;
}
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
  const Loading = dynamic(() => import("@src/components/shared/loading"));
  const [isLoading, setIsLoading] = useState(false);
  const { values, getData, submit } = useForm(Transfer);
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [confirm, setConfirm] = useState(false);
  const [banks, setBanks] = useState<Array<BankType>>([]);
  const [currencies, setCurrencies] = useState<Array<CurrencyType>>([]);
  const [accountName, setAccountName] = useState("");

  async function Transfer() {
    setConfirm(true);
  }
  async function confirmTransfer() {
    try {
      setIsLoading(true);
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
  const getAccountName = async () => {
    try {
      const { data } = await request.post({
        url: "/wallet/verify-bank-account",
        data: {
          accountNumber: values.accountNumber,
          bankCode: values.bankCode,
          currency: values.currency,
        },
      });
      values.accountName = data.accountName;
      setAccountName(data.accountName);
    } catch (error) {
      toggleToast(handleError(error).message);
    }
  };

  async function getBank(value: string | null) {
    try {
      setIsLoading(true);
      const { data } = await request.get({
        url: `/transaction/${value}/supported-banks`,
      });
      setBanks([...(data as BankType[])]);
      values.currency = value;
      setIsLoading(false);
    } catch ({ message }) {
      setIsLoading(false);
    }
  }
  async function getSupportedCurrency() {
    try {
      setIsLoading(true);
      const { data } = await request.get({
        url: "/wallet/supported-currencies",
      });
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
            style={{ color: "#fff", marginLeft: 10, fontSize: 16 }}
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
                  onChange={getData}
                  onBlur={() => getAccountName()}
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
                  {accountName}
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
                  <ButtonComponent type="submit">
                    <>
                      Transfer Fund
                      {isLoading && <Loading sx={{ ml: 1 }} size={15} />}
                    </>
                  </ButtonComponent>
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
                  <ButtonComponent
                    onClick={() => setConfirm(false)}
                    type="submit"
                  >
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
