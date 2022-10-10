import MoveUpOutlinedIcon from "@mui/icons-material/MoveUpOutlined";
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

const WalletToWalletTransfer = ({
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
        url: `/wallet/centre/${centreId}/wallet-transfer`,
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
          mb: { xs: 3, md: 0 },
        }}
        onClick={() => {
          openDialog();
        }}
      >
        <>
          <MoveUpOutlinedIcon />
          <Typography
            variant="h5"
            component="p"
            style={{ color: "#fff", marginLeft: 10, fontSize: 16 }}
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
            : "Kindly make sure you enter a correct USER ID"
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
                  label="Receiver User Id"
                  name="userId"
                  defaultValue={values.userId}
                  onChange={getData}
                  sx={{ width: "100%", marginTop: 3 }}
                  required
                />

                <div style={{ textAlign: "right", marginTop: 20 }}>
                  <ButtonComponent type="submit">
                    Wallet transfer
                  </ButtonComponent>
                  <ButtonComponent onClick={() => closeDialog()} type="submit">
                    Cancel
                  </ButtonComponent>
                </div>
              </form>
            ) : (
              <Box>
                <Typography>
                  You are sending <strong>{values.amount}</strong> to user with
                  Id <strong>{values.userId}</strong>
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

export default WalletToWalletTransfer;
