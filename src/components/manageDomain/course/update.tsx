import React, { ChangeEvent } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import ArrowBackIosNewOutlined from "@mui/icons-material/ArrowBackIosNewOutlined";

import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import TextArea from "@src/components/shared/textArea";
import { useToast } from "@src/utils/hooks";

import { useState } from "react";
import { handleError, queryClient, request, uploadFiles } from "@src/utils";
import ButtonComponent from "@src/components/shared/button";
import CheckBox from "@src/components/shared/checkInput";
import useStyles from "./styles";
import { BasePageProps, CourseInt } from "@src/utils/interface";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Editor from "@src/components/shared/editor";

const UpdateCourse = () => {
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const styles = useStyles();
  const { toastMessage, toggleToast } = useToast();
  const { getData, values, submit, check, getEditor } = useForm(Update);
  const { course } = pageData as {
    course: CourseInt;
  };
  const [img, setImg] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [fileLoadingProgres, setFileLoadingProgress] = useState(0);
  const [imageLoadingProgres, setImageLoadingProgress] = useState(0);
  const [convertedImage, setConvertedImage] = useState<any>();
  const [convertedFile, setConvertedFile] = useState<any>();
  const [file, setFile] = useState<Record<string, any>>();

  const [learnings, setLearnings] = useState<any[]>([]);
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const ImageUpload = dynamic(
    () => import("@src/components/shared/imageUpload")
  );
  const Loading = dynamic(
    () => import("@src/components/shared/loading/loadingWithValue")
  );
  const Delete = dynamic(() => import("./delete"));
  // course?.learnings?.length ? course?.learnings :
  const getFile = (e: ChangeEvent<any>) => {
    setFile({ ...file, [e.target.name || e.target.id]: e.target.files[0] });
  };
  const router = useRouter();
  const { type, folderId } = router.query;
  async function Update() {
    try {
      setIsLoading(true);
      if (img.base64 && !convertedImage) {
        const imageUrl = await uploadFiles(img.base64, setImageLoadingProgress);
        values.imageUrl = imageUrl;
        setConvertedImage(imageUrl);
      }
      if (file && !convertedFile) {
        const fileUrl = await uploadFiles(file.fileUrl, setFileLoadingProgress);
        values.previewVideoUrl = fileUrl;
        setConvertedFile(fileUrl);
      }
      if (learnings.length && type != "FOLDER") values.learnings = learnings;
      if (folderId) values.folderId = folderId;
      values.type = type;
      if (values.tags) values.tags = values.tags.split(",");
      convertedFile && (values.previewVideoUrl = convertedFile);
      convertedImage && (values.imageUrl = convertedImage);
      delete values.type;
      const data = await request.patch({
        url: `/centre/${cachedData.centre.id}/course/${course.id}`,
        data: values,
      });
      toggleToast(data.message);
      setIsLoading(false);
      router.back();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <Box mt={6} mb={10}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          onClick={() => router.back()}
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <ArrowBackIosNewOutlined style={{ marginRight: 10 }} /> Back
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <Delete centreId={cachedData.centre.id} id={course.id} />
          <Typography variant="caption" component="div">
            Want to delete Course?
          </Typography>
        </Box>
      </Box>

      <Typography
        variant="h4"
        component="div"
        style={{
          textTransform: "uppercase",
          marginTop: 40,
          textAlign: "center",
        }}
      >
        Update {type}
      </Typography>
      <form onSubmit={(e) => submit(e)} style={{ marginTop: 40 }}>
        <Stack spacing={3} mt={3}>
          <TextFields
            type="text"
            label="Name"
            name="name"
            defaultValue={course.name}
            onChange={getData}
            inputProps={{ maxLength: 35 }}
            required
          />

          {type != "FOLDER" && (
            <>
              <TextFields
                type="text"
                label="Course tags (keywords)"
                name="tags"
                defaultValue={course?.tags}
                onChange={getData}
              />

              {cachedData.centre.subscriptionModel != "SUBSCRIPTION" && (
                <TextFields
                  type="number"
                  label="Course Price"
                  defaultValue={course.price}
                  name="price"
                  onChange={getData}
                />
              )}
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
                      // defaultValue={value}
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
              <TextFields type="file" name="fileUrl" onChange={getFile} />
              <Stack direction="row" spacing={3}>
                <CheckBox
                  label={
                    <Typography variant="h6" className={styles.checkbox}>
                      Show in search result
                    </Typography>
                  }
                  checked={course.allowSearch}
                  value={values.allowSearch}
                  name="allowSearch"
                  onChange={(e: ChangeEvent<any>) => {
                    course.allowSearch = e.target.checked;
                    check(e);
                  }}
                  className={styles.checkbox}
                />
                <CheckBox
                  label={
                    <Typography variant="h6" className={styles.checkbox}>
                      Allow review
                    </Typography>
                  }
                  checked={course.allowReview}
                  value={values.allowReview}
                  onChange={(e: ChangeEvent<any>) => {
                    course.allowReview = e.target.checked;
                    check(e);
                  }}
                  name="allowReview"
                  className={styles.checkbox}
                />
              </Stack>
              <Box>
                <Typography variant="subtitle1" component="div">
                  Description *
                </Typography>
                <Editor
                  data={course.description}
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
              defaultValue={course.summary}
              style={{
                width: "100%",
                height: 120,
                borderRadius: 5,
                padding: 15,
              }}
              maxLength={250}
            />
          </Box>

          <ImageUpload
            setImg={setImg}
            img={img}
            uploadText="Select and upload course logo"
            defaultImage={course.imageUrl}
          />
        </Stack>
        <Typography style={{ textAlign: "right", marginTop: 25 }}>
          <ButtonComponent
            type="submit"
            sx={{ fontSize: 18 }}
            variant="contained"
          >
            {type === "FOLDER" ? "Update folder" : "Update course"}
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
        color="primary"
        size={100}
        sx={{ marginLeft: 2 }}
        value={fileLoadingProgres || imageLoadingProgres}
      />
    </Box>
  );
};

export default UpdateCourse;
