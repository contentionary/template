import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Dialog from "@src/components/shared/dialog";
import TextFields from "@src/components/shared/input/textField";

import { useDialog } from "@src/hooks";
import { handleError, request } from "@src/utils";

import dynamic from "next/dynamic";
import ButtonComponent from "@src/components/shared/button";
import useForm from "@src/hooks/useForm";
import { useState } from "react";

const BankTransfer = ({
  toggleToast,
  centreId,
}: {
  toggleToast: Function;
  centreId: string;
}) => {
  const Loading = dynamic(() => import("@src/components/shared/loading"));
  const [isLoading, setIsLoading] = useState(false);
  const { values, getData, submit } = useForm(Transfer);
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [confirm, setConfirm] = useState(false);

  async function Transfer() {
    setConfirm(true);
  }
  async function confirmTransfer() {
    try {
      setIsLoading(true);
      const { data } = await request.post({
        url: `/wallet/centre/${centreId}/bank-transfer`,
        data: {
          ...values,
          currency: "NGN",
        },
      });
      console.log(data);
      setIsLoading(false);
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
          openDialog();
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
        message="Kindly make sure you enter a correct USER ID"
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
                  type="number"
                  label="Account number"
                  name="accountNumber"
                  onChange={getData}
                  defaultValue={values.accountNumber}
                  sx={{ width: "100%", marginTop: 3 }}
                  required
                />
                <TextFields
                  type="text"
                  label="Accoun name"
                  name="accountName"
                  defaultValue={values.accountName}
                  onChange={getData}
                  sx={{ width: "100%", marginTop: 3 }}
                  required
                />
                <TextFields
                  type="number"
                  label="Bank code"
                  name="bankCode"
                  defaultValue={values.bankCode}
                  onChange={getData}
                  sx={{ width: "100%", marginTop: 3 }}
                  required
                />
                <TextFields
                  type="text"
                  label="Narration"
                  name="narration"
                  onChange={getData}
                  defaultValue={values.narration}
                  sx={{ width: "100%", marginTop: 3 }}
                  required
                />
                <div style={{ textAlign: "right" }}>
                  <ButtonComponent type="submit">
                    <>
                      Bank transfer
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
