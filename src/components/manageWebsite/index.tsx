import React, { ChangeEvent } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import TextArea from "@src/components/shared/textArea";
import { useToast } from "@src/utils/hooks";
import Toast from "@src/components/shared/toast";

import { useState } from "react";
import { handleError, queryClient, request, uploadFiles } from "@src/utils";
import Loading from "@src/components/shared/loading/loadingWithValue";
import ButtonComponent from "@src/components/shared/button";
import { BasePageProps, TemplateInt } from "@src/utils/interface";
import { ArrowBackIosNewOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import ImageUpload from "@src/components/shared/imageUpload";

const CreatePublication = () => {
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;

  const { toastMessage, toggleToast } = useToast();
  const { values, submit, resetValues } = useForm(Update);
  const { template } = pageData as {
    template: TemplateInt;
  };

  const [img, setImg] = useState<Record<string, any>>({});
  const [img3, setImg3] = useState<Record<string, any>>({});
  const [img2, setImg2] = useState<Record<string, any>>({});
  const [img1, setImg1] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoadingProgres, setImageLoadingProgress] = useState(0);
  const [convertedImage, setConvertedImage] = useState<any>();
  const [contents, setContents] = useState<Array<Record<any, any>>>(
    template.landingPageSectionTwo.contents
  );

  const [landingPageSectionOne, setLandingPageSectionOne] = useState<
    Record<any, any>
  >(template.landingPageSectionOne);

  const router = useRouter();

  async function Update() {
    try {
      setIsLoading(true);
      if (img.base64 && !convertedImage) {
        const imageUrl = await uploadFiles(img.base64, setImageLoadingProgress);
        landingPageSectionOne.imageUrl = imageUrl;
        setConvertedImage(imageUrl);
      }

      if (img1.base64) {
        const imageUrl = await uploadFiles(
          img1.base64,
          setImageLoadingProgress
        );
        contents[0].imageUrl = imageUrl;
      }

      if (img2.base64) {
        const imageUrl = await uploadFiles(
          img2.base64,
          setImageLoadingProgress
        );
        contents[1].imageUrl = imageUrl;
      }

      if (img3.base64) {
        const imageUrl = await uploadFiles(
          img3.base64,
          setImageLoadingProgress
        );
        contents[2].imageUrl = imageUrl;
      }

      const template = {
        landingPageSectionOne: landingPageSectionOne,
        landingPageSectionTwo: {
          contents,
        },
      };
      convertedImage && (values.imageUrl = convertedImage);
      const data = await request.patch({
        url: `/centre/${cachedData.centre.id}/centre-template`,
        data: template,
      });
      toggleToast(data.message);
      resetValues();
      setIsLoading(false);
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <Box mt={6}>
      <Box>
        <Typography
          onClick={() => router.back()}
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <ArrowBackIosNewOutlined style={{ marginRight: 10 }} /> Back
        </Typography>
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
        Manage website
      </Typography>
      <form onSubmit={(e) => submit(e)} style={{ marginTop: 40 }}>
        <Stack spacing={3} mt={3}>
          <Typography variant="h4" component="div">
            Landing Page Section One
          </Typography>
          <TextFields
            type="text"
            label="Title"
            name="title"
            defaultValue={landingPageSectionOne.title}
            onChange={(e: ChangeEvent<any>) => {
              landingPageSectionOne.title = e.target.value;
              setLandingPageSectionOne({ ...landingPageSectionOne });
            }}
            inputProps={{ maxLength: 35 }}
            required
          />
          <ImageUpload
            setImg={setImg}
            img={img}
            uploadText="Select and upload logo"
            defaultImage={landingPageSectionOne.imageUrl}
          />
          <Box>
            <Typography variant="subtitle1" component="div">
              Description *
            </Typography>
            <TextArea
              required
              placeholder="Type in description here ..."
              name="description"
              onChange={(e: ChangeEvent<any>) => {
                landingPageSectionOne.description = e.target.value;
                setLandingPageSectionOne({ ...landingPageSectionOne });
              }}
              defaultValue={landingPageSectionOne.description}
              style={{
                width: "100%",
                height: 120,
                borderRadius: 5,
                padding: 15,
              }}
              maxLength={200}
            />
          </Box>

          <Box>
            <Typography variant="h4" component="div">
              Landing Page Section Two
            </Typography>
            <TextFields
              type="text"
              label="Title"
              name="title"
              defaultValue={contents[0].title}
              onChange={(e: ChangeEvent<any>) => {
                contents[0].title = e.target.value;
                setContents([...contents]);
              }}
              inputProps={{ maxLength: 35 }}
              sx={{
                width: "100%",
                mb: 2,
              }}
              required
            />
            <ImageUpload
              setImg={setImg1}
              img={img1}
              defaultImage={contents[0].imageUrl}
              uploadText="Select and upload logo"
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" component="div">
                Description *
              </Typography>
              <TextArea
                required
                placeholder="Type in description here ..."
                name="description"
                onChange={(e: ChangeEvent<any>) => {
                  contents[0].description = e.target.value;
                  setContents([...contents]);
                }}
                defaultValue={contents[0].description}
                style={{
                  width: "100%",
                  height: 120,
                  borderRadius: 5,
                  padding: 15,
                }}
                maxLength={200}
              />
            </Box>
          </Box>

          <Box>
            <Typography variant="h4" component="div">
              Landing Page Section Three
            </Typography>
            <TextFields
              type="text"
              label="Title"
              name="title"
              defaultValue={contents[1].title}
              onChange={(e: ChangeEvent<any>) => {
                contents[1].title = e.target.value;
                setContents([...contents]);
              }}
              inputProps={{ maxLength: 35 }}
              sx={{
                width: "100%",
                mb: 2,
              }}
              required
            />
            <ImageUpload
              setImg={setImg2}
              img={img2}
              defaultImage={contents[1].imageUrl}
              uploadText="Select and upload logo"
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" component="div">
                Description *
              </Typography>
              <TextArea
                required
                placeholder="Type in description here ..."
                name="description"
                onChange={(e: ChangeEvent<any>) => {
                  contents[1].description = e.target.value;
                  setContents([...contents]);
                }}
                defaultValue={contents[1].description}
                style={{
                  width: "100%",
                  height: 120,
                  borderRadius: 5,
                  padding: 15,
                }}
                maxLength={200}
              />
            </Box>
          </Box>

          <Box>
            <Typography variant="h4" component="div">
              Landing Page Section Four
            </Typography>
            <TextFields
              type="text"
              label="Title"
              name="title"
              defaultValue={contents[2].title}
              onChange={(e: ChangeEvent<any>) => {
                contents[2].title = e.target.value;
                setContents([...contents]);
              }}
              inputProps={{ maxLength: 35 }}
              sx={{
                width: "100%",
                mb: 2,
              }}
              required
            />
            <ImageUpload
              setImg={setImg3}
              img={img3}
              defaultImage={contents[2].imageUrl}
              uploadText="Select and upload logo"
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" component="div">
                Description *
              </Typography>
              <TextArea
                required
                placeholder="Type in description here ..."
                name="description"
                onChange={(e: ChangeEvent<any>) => {
                  contents[2].description = e.target.value;
                  setContents([...contents]);
                }}
                defaultValue={contents[2].description}
                style={{
                  width: "100%",
                  height: 120,
                  borderRadius: 5,
                  padding: 15,
                }}
                maxLength={200}
              />
            </Box>
          </Box>
          <Typography style={{ textAlign: "right" }}>
            <ButtonComponent type="submit" sx={{ fontSize: 18 }}>
              <>
                Mange website
                {isLoading && (
                  <Loading
                    color="primary"
                    size={35}
                    sx={{ marginLeft: 2 }}
                    value={imageLoadingProgres}
                  />
                )}
              </>
            </ButtonComponent>
          </Typography>
        </Stack>
      </form>

      {toastMessage && (
        <Toast
          message={toastMessage}
          status={Boolean(toggleToast)}
          showToast={toggleToast}
        />
      )}
    </Box>
  );
};

export default CreatePublication;
