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

const BankTransfer = ({ toggleToast }: { toggleToast: Function }) => {
  const Loading = dynamic(() => import("@src/components/shared/loading"));
  const Modal = dynamic(
    () => import("@src/components/shared/confirmationModal")
  );
  const [isLoading, setIsLoading] = useState(false);
  const { values, getData, submit } = useForm(Transfer);
  const { isOpen, openDialog, closeDialog } = useDialog();

  async function Transfer() {
    try {
      setIsLoading(true);
      openDialog();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }
  async function confirmTransfer() {
    try {
      setIsLoading(true);
      openDialog();
      const { data } = await request.post({
        url: "/wallet/bank-transfer",
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
          paddingY: 1,
          paddingX: 3,
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
        title="Wallet to bank transfer"
        isOpen={isOpen}
        closeDialog={closeDialog}
        message="Kindly make sure you enter a correct USER ID"
        content={
          <Box>
            <form onSubmit={(e) => submit(e)}>
              {/* `You are sending ${values.amount} to user with Id ${values.userId} */}
              <TextFields
                type="number"
                label="Amount"
                name="amount"
                onChange={getData}
                sx={{ width: "100%", marginTop: 3 }}
                required
              />
              <TextFields
                type="number"
                label="Account number"
                name="accountNumber"
                onChange={getData}
                sx={{ width: "100%", marginTop: 3 }}
                required
              />
              <TextFields
                type="text"
                label="Accoun name"
                name="accountName"
                onChange={getData}
                sx={{ width: "100%", marginTop: 3 }}
                required
              />
              <TextFields
                type="number"
                label="Bank code"
                name="bankCode"
                onChange={getData}
                sx={{ width: "100%", marginTop: 3 }}
                required
              />
              <TextFields
                type="text"
                label="Narration"
                name="narration"
                onChange={getData}
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
              </div>
            </form>
          </Box>
        }
      />
    </>
  );
};

export default BankTransfer;
