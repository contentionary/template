import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import Dialog from "@src/components/shared/dialog";
import useForm from "@src/hooks/useForm";
import { useDialog } from "@src/hooks";
import { handleError, request } from "@src/utils";
import { useState } from "react";
import ButtonComponent from "@src/components/shared/button";
import dynamic from "next/dynamic";
import TextArea from "@src/components/shared/textArea";

const AddSubscriber = ({
  centreId,
  toggleToast,
  refetch,
}: {
  centreId: string;
  toggleToast: Function;
  refetch: Function;
}): JSX.Element => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { getData, values, submit } = useForm(create);
  const Loading = dynamic(() => import("@src/components/shared/loading"));
  async function create() {
    try {
      setIsLoading(true);
      const data = await request.post({
        url: `/centre/${centreId}/users`,
        data: { usernames: values.subscribers.split(",") },
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
          <AddCircleOutlineOutlined /> &nbsp; Add Centre Subscribers
        </>
      </ButtonComponent>

      <Dialog
        title="Add Centre Subscribers"
        isOpen={isOpen}
        closeDialog={closeDialog}
        content={
          <form onSubmit={(e) => submit(e)}>
            <Stack spacing={3} mt={3}>
              <Typography variant="h5" component="div">
                Enter Subscriber’s email or username:
              </Typography>
              <Typography variant="subtitle1" component="div">
                Type the emails or username of the new subscribers you want to
                add. If you want to add multiple subscribers, then seperate the
                email or username with a comma (,)
              </Typography>
              <TextArea
                name="subscribers"
                maxRows={3}
                onChange={getData}
                style={{
                  padding: "20px 10px",
                  borderRadius: 5,
                  height: 120,
                }}
                required
              />
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
