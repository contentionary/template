import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import Dialog from "@src/components/shared/dialog";
import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/utils/hooks/useForm";
import { useDialog } from "@src/utils/hooks";
import { handleError, request } from "@src/utils";
import { useState } from "react";
import ButtonComponent from "@src/components/shared/button";
import dynamic from "next/dynamic";

const AddSubscriber = ({
  toggleToast,
  refetch,
  centreId,
  id,
}: {
  toggleToast: Function;
  refetch: Function;
  centreId: string;
  id: string;
}): JSX.Element => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { getData, values, submit } = useForm(create);
  const Loading = dynamic(() => import("@src/components/shared/loading"));
  async function create() {
    try {
      setIsLoading(true);
      const data = await request.post({
        url: `/centre/${centreId}/league/${id}/candidates`,
        data: {
          candidates: values.candidates.split(","),
          nextPaymentDate: values.nextPaymentDate,
        },
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
      <ButtonComponent
        variant="contained"
        onClick={() => openDialog()}
        sx={{ fontSize: 18 }}
      >
        <>
          <AddCircleOutlineOutlined /> &nbsp; Add Candidates
        </>
      </ButtonComponent>

      <Dialog
        title="Add Candidates"
        isOpen={isOpen}
        closeDialog={closeDialog}
        content={
          <form onSubmit={(e) => submit(e)}>
            <Stack spacing={3} mt={3}>
              <Typography variant="h5" component="div">
                Enter Subscriber’s email or username:
              </Typography>
              <Typography variant="subtitle1" component="div">
                Type the emails or username of the new candidates you want to
                add. If you want to add multiple candidates, then seperate the
                email or username with a comma (,)
              </Typography>
              <TextFields
                type="text"
                label="candidates"
                name="candidates"
                onChange={getData}
                required
              />
              <Box>
                <TextFields
                  type="datetime-local"
                  name="nextPaymentDate"
                  onChange={getData}
                  required
                  fullWidth
                />
                <Typography variant="body2" component="div">
                  Next Payment Date
                </Typography>
              </Box>

              <Typography style={{ textAlign: "right", marginTop: 20 }}>
                <ButtonComponent type="submit" sx={{ fontSize: 18 }}>
                  <>
                    Add
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

export default AddSubscriber;
