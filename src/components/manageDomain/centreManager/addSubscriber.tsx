import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import Dialog from "@src/components/shared/dialog";
import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import { useDialog } from "@src/hooks";
import { handleError, request } from "@src/utils";
import { useState } from "react";
import ButtonComponent from "@src/components/shared/button";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import dynamic from "next/dynamic";

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
        url: `/centre/${centreId}/centre-manager`,
        data: values,
      });
      refetch();
      toggleToast(data.message);
      setIsLoading(false);
      closeDialog();
    } catch (error) {
      toggleToast(handleError(error));
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
          <AddCircleOutlineOutlined /> &nbsp; Add Centre Managers
        </>
      </ButtonComponent>

      <Dialog
        title="Add Centre Managers"
        isOpen={isOpen}
        closeDialog={closeDialog}
        content={
          <form onSubmit={(e) => submit(e)}>
            <Stack spacing={3} mt={3}>
              <Typography variant="h5" component="div">
                Enter Subscriber’s email or username:
              </Typography>
              <Typography variant="subtitle1" component="div">
                Type the emails or username of the new managers you want to add.
                If you want to add multiple managers, then seperate the email or
                username with a comma (,)
              </Typography>
              <TextFields
                type="text"
                label="managers"
                name="username"
                onChange={getData}
                required
              />
              <FormControl fullWidth>
                <InputLabel id="roleId">Role</InputLabel>
                <Select
                  labelId="roleId"
                  label="Role"
                  name="role"
                  value={values.role || ""}
                  onChange={(e) => getData(e)}
                >
                  <MenuItem value="OWNER">OWNER</MenuItem>
                  <MenuItem value="MANAGER">MANAGER</MenuItem>
                </Select>
              </FormControl>
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
