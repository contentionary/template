import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Dialog from "@src/components/shared/dialog";
import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import TextArea from "@src/components/shared/textArea";
import { useToast } from "@src/utils/hooks";
import Toast from "@src/components/shared/toast";

import { useDialog } from "@src/hooks";
import { useState } from "react";
import { handleError, request } from "@src/utils";
import Loading from "@src/components/shared/loading";
import ButtonComponent from "@src/components/shared/button";
import Button from "@src/components/shared/button";
import useStyles from "./styles";
import { PublicationInt } from "@src/utils/interface";

interface Props {
  centreId: string;
  listOfPublication: PublicationInt[];
}

const CreatePublication = ({ centreId, listOfPublication }: Props) => {
  const styles = useStyles();

  const { isOpen, openDialog, closeDialog } = useDialog();
  const { toastMessage, toggleToast } = useToast();
  const { getData, values, submit } = useForm(create);
  const [isLoading, setIsLoading] = useState(false);

  async function create() {
    try {
      setIsLoading(true);
      values.tags = [];
      const data = await request.post({
        url: `/centre/${centreId}/publication-folder`,
        data: values,
      });

      // setListOfPublication([...listOfPublication, data]);
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
      <Button
        onClick={() => openDialog()}
        disableElevation
        className={styles.createFolder}
      >
        Add folder
      </Button>

      <Dialog
        title="Create Folder "
        isOpen={isOpen}
        closeDialog={closeDialog}
        content={
          <form onSubmit={(e) => submit(e)}>
            <Stack spacing={3} mt={3}>
              <TextFields
                type="text"
                label="Folder name"
                name="name"
                // defaultValue={centre?.name}
                onChange={getData}
                inputProps={{ maxLength: 35 }}
              />

              <Box>
                <Typography>Description</Typography>
                <TextArea
                  placeholder="Type in description here ..."
                  name="description"
                  // defaultValue={centre?.address}
                  onChange={getData}
                  style={{
                    width: "100%",
                    height: 100,
                    borderRadius: 5,
                    padding: 15,
                  }}
                />
              </Box>
            </Stack>
            <Typography style={{ textAlign: "right", marginTop: 20 }}>
              <ButtonComponent type="submit">
                <>
                  Create Folder
                  {isLoading && (
                    <Loading color="primary" size={12} sx={{ marginLeft: 2 }} />
                  )}
                </>
              </ButtonComponent>
              <ButtonComponent onClick={() => closeDialog()}>
                Cancel
              </ButtonComponent>
            </Typography>
          </form>
        }
      />
      {toastMessage && (
        <Toast
          message={toastMessage}
          status={Boolean(toggleToast)}
          showToast={toggleToast}
        />
      )}
    </>
  );
};

export default CreatePublication;
