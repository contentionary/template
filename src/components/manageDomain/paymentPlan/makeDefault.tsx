import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@src/components/shared/dialog";
import { useDialog } from "@src/hooks";
import { handleError, request } from "@src/utils";
import { useState } from "react";
import ButtonComponent from "@src/components/shared/button";
import dynamic from "next/dynamic";

const MakeDefaultPaymentPlan = ({
  toggleToast,
  refetch,
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
  const Loading = dynamic(() => import("@src/components/shared/loading"));
  async function makeDefault() {
    try {
      setIsLoading(true);
      const data = await request.patch({
        url: `/centre/${centreId}/product/${productId}/default-pricing/${id}`,
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
        Make Default
      </MenuItem>

      <Dialog
        title="Confirm you want to continue this action"
        isOpen={isOpen}
        closeDialog={closeDialog}
        content={
          <Stack spacing={3} mt={3}>
            <Typography variant="subtitle1" component="div">
              This action will make <strong>{name}</strong> the default payment
              plan. Are you sure you want to continue?
            </Typography>

            <Typography style={{ textAlign: "right", marginTop: 20 }}>
              <ButtonComponent
                type="submit"
                sx={{ fontSize: 18 }}
                onClick={() => makeDefault()}
              >
                <>
                  Sure, continue
                  {isLoading && <Loading size={15} />}
                </>
              </ButtonComponent>
              <ButtonComponent
                onClick={() => closeDialog()}
                sx={{ fontSize: 18, color: "red" }}
              >
                Cancel
              </ButtonComponent>
            </Typography>
          </Stack>
        }
      />
    </>
  );
};

export default MakeDefaultPaymentPlan;
