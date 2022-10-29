import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import Dialog from "@src/components/shared/dialog";
import Toast from "@src/components/shared/toast";
import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import TextArea from "@src/components/shared/textArea";

import { useToast } from "@src/utils/hooks";
import { useDialog } from "@src/hooks";
import { handleError, queryClient, request, uploadFiles } from "@src/utils";
import { ChangeEvent, useState } from "react";
import ButtonComponent from "@src/components/shared/button";
import { BasePageProps } from "@src/utils/interface";

interface Props {
  id?: string;
  centreId: string;
  CourseId: string;
  index: number;
  refetch: Function;
}

const AddModules = ({
  CourseId,
  centreId,
  id,
  index,
  refetch,
}: Props): JSX.Element => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage, toggleToast } = useToast();
  const { getData, values, submit } = useForm(create);
  const [file, setFile] = useState<Record<string, any>>();
  const [fileLoadingProgres, setFileLoadingProgress] = useState(0);
  const [convertedFile, setConvertedFile] = useState<any>();
  const pageProps = queryClient.getQueryData("pageProps") as BasePageProps;

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
        url: id
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
      <MenuItem onClick={() => openDialog()} disableRipple>
        <AddCircleOutlineOutlined />
        Add {id ? "Content" : "Modules"}
      </MenuItem>
      <Dialog
        title={`Add course ${id ? "content" : "modules"} `}
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
              {id && (
                <TextFields type="file" name="fileUrl" onChange={getFile} />
              )}
              <Typography style={{ textAlign: "right", marginTop: 20 }}>
                <ButtonComponent type="submit" sx={{ fontSize: 18 }}>
                  Create
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
