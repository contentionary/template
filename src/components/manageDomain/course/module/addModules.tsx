import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Dialog from "@src/components/shared/dialog";
import Toast from "@src/components/shared/toast";
import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import TextArea from "@src/components/shared/textArea";

import { useToast } from "@src/utils/hooks";
import { handleError, request, uploadFiles } from "@src/utils";
import { ChangeEvent, useState } from "react";
import ButtonComponent from "@src/components/shared/button";

interface Props {
  id?: string;
  centreId: string;
  CourseId: string;
  index: number;
  refetch: Function;
  content?: boolean;
  closeDialog: Function;
  isOpen: boolean;
}

const AddModules = ({
  CourseId,
  centreId,
  id,
  refetch,
  content,
  closeDialog,
  isOpen,
}: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage, toggleToast } = useToast();
  const { getData, values, submit } = useForm(create);
  const [file, setFile] = useState<Record<string, any>>();
  const [fileLoadingProgres, setFileLoadingProgress] = useState(0);
  const [convertedFile, setConvertedFile] = useState<any>();

  const getFile = (e: ChangeEvent<any>) => {
    setFile({ ...file, [e.target.name || e.target.id]: e.target.files[0] });
  };
  async function create() {
    try {
      setIsLoading(true);
      if (file && !convertedFile) {
        const fileUrl = await uploadFiles(file.fileUrl, setFileLoadingProgress);
        values.fileUrl = fileUrl;
        setConvertedFile(fileUrl);
      }
      if (id) values.moduleId = id;
      const data = await request.post({
        url:
          id || content
            ? `/centre/${centreId}/course/${CourseId}/content`
            : `/centre/${centreId}/course/${CourseId}/module`,
        data: values,
      });
      toggleToast(data.message);
      refetch();
      setIsLoading(false);
      closeDialog();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Dialog
        title={`Add course ${id || content ? "content" : "modules"} `}
        isOpen={isOpen}
        closeDialog={closeDialog}
        value={fileLoadingProgres}
        isLoading={isLoading}
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
              {(id || content) && (
                <TextFields type="file" name="fileUrl" onChange={getFile} />
              )}
              <Typography style={{ textAlign: "right", marginTop: 20 }}>
                <ButtonComponent type="submit" sx={{ fontSize: 18 }}>
                  Add
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
      {toastMessage && (
        <Toast
          status={Boolean(toastMessage)}
          message={toastMessage}
          showToast={toggleToast}
        />
      )}
    </>
  );
};

export default AddModules;
