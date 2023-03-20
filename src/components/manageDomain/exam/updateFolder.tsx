import React, { FormEvent } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewOutlined from "@mui/icons-material/ArrowBackIosNewOutlined";

import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import TextArea from "@src/components/shared/textArea";
import { useToast } from "@src/utils/hooks";
import { useState } from "react";
import { handleError, queryClient, request, uploadFiles } from "@src/utils";
import ButtonComponent from "@src/components/shared/button";
import { BasePageProps } from "@src/utils/interface";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const CreateCourse = () => {
  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const exam = pageData.exam;
  const { toastMessage, toggleToast } = useToast();
  const { getData, values, submit, resetValues } = useForm(update);
  const [img, setImg] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedImage, setConvertedImage] = useState<any>();
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

  async function update() {
    try {
      setIsLoading(true);
      if (img.base64 && !convertedImage) {
        const imageUrl = await uploadFiles(img.base64, setProgress);
        values.image = imageUrl;
        setConvertedImage(imageUrl);
      }
      if (folderId) values.folderId = folderId;
      convertedImage && (values.image = convertedImage);
      const data = await request.patch({
        url: `/centre/${cachedData.centre.id}/exam/${exam.id}`,
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
          <Box>
            <TextFields
              type="text"
              label="Name"
              name="name"
              defaultValue={exam.name}
              onChange={getData}
              inputProps={{ maxLength: 60 }}
              sx={{ width: "100%" }}
              required
            />
            <Typography variant="body2" component="div">
              (Not more than 60 characters)
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" component="div">
              Summary (Not more than 250 characters)*
            </Typography>
            <TextArea
              required
              placeholder="Type in description here ..."
              name="summary"
              defaultValue={exam.summary}
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
          <ImageUpload
            setImg={setImg}
            img={img}
            uploadText="Select and upload exam logo"
            defaultImage={exam.image}
          />
        </Stack>
        <Typography style={{ textAlign: "right", marginTop: 20 }}>
          <ButtonComponent
            variant="contained"
            type="submit"
            sx={{ fontSize: 18 }}
          >
            Update Folder
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
        value={progress}
      />
    </Box>
  );
};

export default CreateCourse;
