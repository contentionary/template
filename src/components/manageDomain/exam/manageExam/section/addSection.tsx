import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import Dialog from "@src/components/shared/dialog";
import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import TextArea from "@src/components/shared/textArea";

import { useDialog } from "@src/hooks";
import { handleError, request } from "@src/utils";
import { useState } from "react";
import ButtonComponent from "@src/components/shared/button";
import dynamic from "next/dynamic";

interface Props {
  centreId: string;
  examId: string;
  toggleToast: Function;
  refetch: Function;
}

const AddSection = ({
  examId,
  centreId,
  toggleToast,
  refetch,
}: Props): JSX.Element => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { getData, values, submit } = useForm(create);
  const Loading = dynamic(() => import("@src/components/shared/loading"));
  async function create() {
    try {
      setIsLoading(true);
      await request.post({
        url: `/centre/${centreId}/exam/${examId}/question-section`,
        data: values,
      });
      refetch();
      toggleToast("Section Created");
      setIsLoading(false);
      closeDialog();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Stack direction="row" spacing={2}>
        <ButtonComponent
          variant="outlined"
          onClick={() => openDialog()}
          disableRipple
        >
          <>
            <AddCircleOutlineOutlined /> &nbsp; Add section
          </>
        </ButtonComponent>
        <Typography>
          Click the circled-plus button to create new exam sections that will be
          <br />
          added to the general section.
        </Typography>
      </Stack>

      <Dialog
        title="Add section"
        isOpen={isOpen}
        closeDialog={closeDialog}
        content={
          <form onSubmit={(e) => submit(e)}>
            <Stack spacing={3} mt={3}>
              <TextFields
                type="text"
                label="name"
                name="name"
                onChange={getData}
                required
              />
              <Box>
                <Typography variant="subtitle1" component="div">
                  Description *
                </Typography>
                <TextArea
                  required
                  placeholder="Type in description here ..."
                  name="description"
                  onChange={getData}
                  style={{
                    width: "100%",
                    height: 120,
                    borderRadius: 5,
                    padding: 15,
                  }}
                  maxLength={200}
                />
              </Box>
              <Typography style={{ textAlign: "right", marginTop: 20 }}>
                <ButtonComponent type="submit" sx={{ fontSize: 18 }}>
                  <>
                    Create
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

export default AddSection;
