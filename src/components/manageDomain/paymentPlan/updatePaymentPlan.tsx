import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@src/components/shared/dialog";
import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import { useDialog } from "@src/hooks";
import { handleError, request } from "@src/utils";
import { useState } from "react";
import ButtonComponent from "@src/components/shared/button";
import dynamic from "next/dynamic";

const UpdatePaymentPlan = ({
  toggleToast,
  refetch,
  amount,
  name,
  productId,
  id,
  centreId,
}: {
  toggleToast: Function;
  refetch: Function;
  amount: string;
  name: string;
  productId: string;
  id: string;
  centreId: string;
}): JSX.Element => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { getData, values, submit } = useForm(create);
  const Loading = dynamic(() => import("@src/components/shared/loading"));
  async function create() {
    try {
      setIsLoading(true);
      const data = await request.patch({
        url: `/centre/${centreId}/product/${productId}/pricing/${id}`,
        data: values,
      });
      refetch();
      toggleToast(data.message);
      setIsLoading(false);
      closeDialog();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <MenuItem onClick={() => openDialog()} sx={{ fontSize: 18 }}>
        Update
      </MenuItem>

      <Dialog
        title="Update Payment Plan"
        isOpen={isOpen}
        closeDialog={closeDialog}
        content={
          <form onSubmit={(e) => submit(e)}>
            <Stack spacing={3} mt={3}>
              {/* <Typography variant="h5" component="div">
                Enter Subscriber’s email or username:
              </Typography>
              <Typography variant="subtitle1" component="div">
                Type the emails or username of the new subscribers you want to
                add. If you want to add multiple subscribers, then seperate the
                email or username with a comma (,)
              </Typography> */}
              <TextFields
                type="text"
                label="Name"
                name="name"
                defaultValue={name}
                onChange={getData}
              />
              <TextFields
                type="number"
                label="Amount"
                name="amount"
                defaultValue={amount}
                onChange={getData}
              />
              <Typography style={{ textAlign: "right", marginTop: 20 }}>
                <ButtonComponent type="submit" sx={{ fontSize: 18 }}>
                  <>
                    Update Payment Plan
                    {isLoading && <Loading size={15} />}
                  </>
                </ButtonComponent>
                <ButtonComponent
                  onClick={() => closeDialog()}
                  sx={{ fontSize: 18 }}
                >
                  Cancel
                </ButtonComponent>
              </Typography>
            </Stack>
          </form>
        }
      />
    </>
  );
};

export default UpdatePaymentPlan;
