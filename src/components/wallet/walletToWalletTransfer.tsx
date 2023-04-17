import MoveUpOutlinedIcon from "@mui/icons-material/MoveUpOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import dynamic from "next/dynamic";

import ButtonComponent from "@src/components/shared/button";
import useForm from "@src/hooks/useForm";
import Dialog from "@src/components/shared/dialog";
import TextFields from "@src/components/shared/input/textField";

import { useDialog } from "@src/hooks";
import { handleError, request } from "@src/utils";
import { useState } from "react";
import { CurrencyType } from "./interface";

const WalletToWalletTransfer = ({
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
  const [currencies, setCurrencies] = useState<Array<CurrencyType>>([]);
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [confirm, setConfirm] = useState(false);
  const [receiverName, setReceiverName] = useState("");

  async function Transfer() {
    try {
      const { data } = await request.get({
        url: `/auth/${values.receiverUserId}/view`,
      });
      setReceiverName(`${data.firstname} ${data.surname}`);
      setConfirm(true);
    } catch (error) {
      toggleToast(handleError(error).message);
    }
  }
  async function confirmTransfer() {
    try {
      setIsLoading(true);
      const { message } = await request.post({
        url: centreWallet
          ? `/wallet/centre/${centreId}/wallet-transfer`
          : "/wallet/wallet-transfer",
        data: { ...values, amount: values.amount * 100 },
      });
      toggleToast(message);
      setIsLoading(false);
      closeDialog();
    } catch (error) {
      toggleToast(handleError(error).message);
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
          mb: { xs: 3, md: 2, lg: 0 },
        }}
        onClick={() => {
          getSupportedCurrency();
        }}
      >
        <>
          <MoveUpOutlinedIcon />
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: "#fff",
              marginLeft: 1,
              fontSize: { xs: 16, md: 20, lg: 16 },
            }}
          >
            Wallet to Wallet Transfer
          </Typography>
        </>
      </ButtonComponent>
      <Dialog
        title="Wallet to wallet transfer"
        isOpen={isOpen}
        closeDialog={closeDialog}
        message={
          confirm
            ? "Confirm payment"
            : "Kindly make sure you enter a correct WALLET ID"
        }
        content={
          <Box mt={2}>
            {!confirm ? (
              <form onSubmit={(e) => submit(e)}>
                <TextFields
                  type="number"
                  label="Amount"
                  name="amount"
                  defaultValue={values.amount}
                  onChange={getData}
                  sx={{ width: "100%", marginTop: 3 }}
                  required
                />
                <TextFields
                  type="text"
                  label="Receiver Wallet Id"
                  name="receiverUserId"
                  defaultValue={values.receiverUserId}
                  onChange={getData}
                  sx={{ width: "100%", marginTop: 3 }}
                  required
                />
                <Select
                  name="currency"
                  value={values.currency || "none"}
                  onChange={(e) => getData(e)}
                  sx={{ width: "100%", mt: 3 }}
                  required
                >
                  <MenuItem value="none">Select currency</MenuItem>
                  {currencies.map(({ abbr, name }, index) => (
                    <MenuItem key={index} value={abbr}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                <div style={{ textAlign: "right", marginTop: 20 }}>
                  <ButtonComponent type="submit">Transfer Fund</ButtonComponent>
                  <ButtonComponent onClick={() => closeDialog()} type="submit">
                    Cancel
                  </ButtonComponent>
                </div>
              </form>
            ) : (
              <Box>
                <Typography>
                  You are sending <strong>{values.amount}</strong> to &nbsp;
                  <strong>{values.receiverUserId}</strong> with the name &nbsp;
                  {receiverName} wallet
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

export default WalletToWalletTransfer;
