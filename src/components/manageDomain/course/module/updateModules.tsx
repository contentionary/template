import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Edit from "@mui/icons-material/Edit";
import Dialog from "@src/components/shared/dialog";
import Toast from "@src/components/shared/toast";
import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import TextArea from "@src/components/shared/textArea";
// import Typography from "@mui/material";

import { useToast } from "@src/utils/hooks";
import { useDialog } from "@src/hooks";
import { handleError, request, uploadFiles } from "@src/utils";
import { ChangeEvent, useState } from "react";
import ButtonComponent from "@src/components/shared/button";
import dynamic from "next/dynamic";
import { CourseContentInt, CourseModuleInt } from "@src/utils/interface";

interface Props {
  content?: boolean;
  centreId: string;
  courseId: string;
  module: CourseModuleInt | CourseContentInt;
}

const AddModules = ({
  courseId,
  centreId,
  content,
  module,
}: Props): JSX.Element => {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage, toggleToast } = useToast();
  const { getData, values, submit } = useForm(create);
  const [file, setFile] = useState<Record<string, any>>();
  const [fileLoadingProgres, setFileLoadingProgress] = useState(0);
  const [convertedFile, setConvertedFile] = useState<any>();

  const getFile = (e: ChangeEvent<any>) => {
    setFile({ ...file, [e.target.name || e.target.id]: e.target.files[0] });
  };
  const Loading = dynamic(
    () => import("@src/components/shared/loading/loadingWithValue")
  );
  async function create() {
    try {
      setIsLoading(true);
      if (file && !convertedFile) {
        const fileUrl = await uploadFiles(file.fileUrl, setFileLoadingProgress);
        values.fileUrl = fileUrl;
        setConvertedFile(fileUrl);
      }
      const data = await request.patch({
        url: `/centre/${centreId}/course/${courseId}/content/${module.id}`,
        data: values,
      });
      toggleToast(data.message);
      closeDialog();
      setIsLoading(false);
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <MenuItem onClick={() => openDialog()} disableRipple>
        <Edit />
        Update {content ? "Content" : "Modules"}
      </MenuItem>
      <Dialog
        title={`Update course ${content ? "content" : "modules"} `}
        isOpen={isOpen}
        closeDialog={closeDialog}
        content={
          <form onSubmit={(e) => submit(e)}>
            <Stack spacing={3} mt={3}>
              <TextFields
                type="text"
                label="name"
                name="name"
                defaultValue={module.name}
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
                  defaultValue={module.description}
                  style={{
                    width: "100%",
                    height: 120,
                    borderRadius: 5,
                    padding: 15,
                  }}
                  maxLength={200}
                />
              </Box>
              {content && (
                <TextFields type="file" name="fileUrl" onChange={getFile} />
              )}
              <Typography style={{ textAlign: "right", marginTop: 20 }}>
                <ButtonComponent type="submit" sx={{ fontSize: 18 }}>
                  Update
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
      <Loading value={fileLoadingProgres} open={isLoading} size={100} />
    </>
  );
};

export default AddModules;
