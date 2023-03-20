import React, { ChangeEvent, FormEvent } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import TextArea from "@src/components/shared/textArea";
import { useToast } from "@src/utils/hooks";
import { useState } from "react";
import { handleError, queryClient, request, uploadFiles } from "@src/utils";
import ButtonComponent from "@src/components/shared/button";
import CheckBox from "@src/components/shared/checkInput";
import useStyles from "./styles";
import { BasePageProps } from "@src/utils/interface";
// DO NOT IMPORT COMPONENT LIKE THIS!
import { ArrowBackIosNewOutlined, CloseOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Editor from "@src/components/shared/editor";

const CreateCourse = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const styles = useStyles();
  const { toastMessage, toggleToast } = useToast();
  const { getData, values, submit, check, resetValues, getEditor } =
    useForm(create);
  const [img, setImg] = useState<Record<string, any>>({});
  const [fileLoadingProgres, setFileLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [progres, setProgress] = useState(0);
  const [convertedImage, setConvertedImage] = useState<any>();
  const [convertedFile, setConvertedFile] = useState<any>();
  const [file, setFile] = useState<Record<string, any>>();
  const [learnings, setLearnings] = useState<any[]>([]);
  const [formEvent, setFormEvent] = useState<FormEvent<HTMLFormElement>>();

  const router = useRouter();
  const { type, folderId } = router.query;
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const ImageUpload = dynamic(
    () => import("@src/components/shared/imageUpload")
  );
  const Loading = dynamic(
    () => import("@src/components/shared/loading/loadingWithValue")
  );
  const getFile = (e: ChangeEvent<any>) => {
    setFile({ ...file, [e.target.name || e.target.id]: e.target.files[0] });
  };

  async function create() {
    try {
      setIsLoading(true);
      if (img.base64 && !convertedImage) {
        const imageUrl = await uploadFiles(img.base64, setProgress);
        values.imageUrl = imageUrl;
        setConvertedImage(imageUrl);
      }
      if (file && !convertedFile) {
        const fileUrl = await uploadFiles(
          file.previewVideoUrl,
          setFileLoadingProgress
        );
        values.previewVideoUrl = fileUrl;
        setConvertedFile(fileUrl);
      }
      if (learnings.length) values.learnings = learnings;
      if (folderId) values.folderId = folderId;
      values.type = type;
      convertedFile && (values.fileUrl = convertedFile);
      convertedImage && (values.imageUrl = convertedImage);
      const data = await request.post({
        url:
          type === "FOLDER"
            ? `/centre/${cachedData.centre.id}/course-folder`
            : `/centre/${cachedData.centre.id}/course`,
        data: values,
      });
      toggleToast(data.message);
      resetValues(formEvent);
      setIsLoading(false);
      router.back();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <Box mt={6} mb={10}>
      <Typography
        onClick={() => router.back()}
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        <ArrowBackIosNewOutlined style={{ marginRight: 10 }} /> Back
      </Typography>
      <Typography
        variant="h4"
        component="p"
        style={{
          textTransform: "uppercase",
          marginTop: 40,
          textAlign: "center",
        }}
      >
        Create {type}
      </Typography>
      <form
        onSubmit={(e) => {
          submit(e);
          setFormEvent(e);
        }}
        style={{ marginTop: 40 }}
      >
        <Stack spacing={3} mt={3}>
          <TextFields
            type="text"
            label="Name"
            name="name"
            onChange={getData}
            inputProps={{ maxLength: 100 }}
            required
          />

          {type != "FOLDER" && (
            <>
              <TextFields
                type="number"
                label="Course Price"
                name="price"
                onChange={getData}
              />
              <Box>
                <Typography variant="subtitle1" component="div">
                  Learnings
                </Typography>
                <Typography variant="caption" component="div">
                  Click add more learnings, to add more learnings
                </Typography>
                {learnings.map(({}, index) => (
                  <Box
                    key={`${index}-content`}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                      mt: 1,
                    }}
                  >
                    <TextFields
                      type="text"
                      label="Learnings"
                      name="learnings"
                      onChange={(e: ChangeEvent<any>) => {
                        learnings[index] = e.target.value;
                        setLearnings([...learnings]);
                      }}
                      sx={{ width: { xs: "90%", md: "78%" } }}
                    />
                    <Box sx={{ width: "5%" }}>
                      <IconButton
                        onClick={() => {
                          learnings.splice(index, 1);
                          setLearnings([...learnings]);
                        }}
                      >
                        <CloseOutlined htmlColor="red" />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <ButtonComponent
                    onClick={() => setLearnings([...learnings, ""])}
                  >
                    Add more learnings
                  </ButtonComponent>
                </Box>
              </Box>
              <Stack direction="row" spacing={3} flexWrap="wrap">
                <CheckBox
                  label={
                    <Typography variant="h6" className={styles.checkbox}>
                      Show in search result
                    </Typography>
                  }
                  name="allowSearch"
                  onChange={check}
                  className={styles.checkbox}
                />
                <CheckBox
                  label={
                    <Typography variant="h6" className={styles.checkbox}>
                      Allow review
                    </Typography>
                  }
                  onChange={check}
                  name="allowReview"
                  className={styles.checkbox}
                />
              </Stack>
              <Box>
                <Typography variant="subtitle1" component="div">
                  Description *
                </Typography>
                <Editor
                  data=""
                  onChange={(event: any, editor: any) =>
                    getEditor(event, editor, "description")
                  }
                />
              </Box>
            </>
          )}
          <Box>
            <Typography variant="subtitle1" component="div">
              Summary (Not more than 250 characters)*
            </Typography>
            <TextArea
              required
              placeholder="Type in summary here ..."
              name="summary"
              onChange={getData}
              style={{
                width: "100%",
                height: 120,
                borderRadius: 5,
                padding: 15,
              }}
              maxLength={250}
            />
          </Box>
          {type != "FOLDER" && (
            <Box>
              <Typography variant="h6">Preview Video</Typography>
              <TextFields
                type="file"
                name="previewVideoUrl"
                onChange={getFile}
              />
            </Box>
          )}
          <ImageUpload
            setImg={setImg}
            img={img}
            uploadText="Select and upload course logo"
            defaultImage=""
          />
        </Stack>
        <Typography style={{ textAlign: "right", marginTop: 20 }}>
          <ButtonComponent
            variant="contained"
            type="submit"
            sx={{ fontSize: 18 }}
          >
            {type === "FOLDER" ? "Create folder" : "Create course"}
          </ButtonComponent>
        </Typography>
      </form>

      {toastMessage && (
        <Toast
          message={toastMessage}
          status={Boolean(toggleToast)}
          showToast={toggleToast}
        />
      )}

      <Loading
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
        color="primary"
        size={100}
        value={fileLoadingProgres || progres}
      />
    </Box>
  );
};

export default CreateCourse;
